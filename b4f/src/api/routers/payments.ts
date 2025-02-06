/* eslint-disable indent */
/* eslint-disable @typescript-eslint/no-misused-promises */
import express, { type Request, type Response } from 'express'
import { Logger } from '../../logger'
import { cancelUrl, productPrice1, productPrice2, secretKey, successUrl, stripeWebhookSecret, product1, product2 } from '../../config'
import { type StripeEventType, type ErrorType } from '../types'
import { apiErrorHandler, asyncErrWrapper, formatError } from '../errorHandling'
import { verifyAndDecodeToken } from '../utils'
import { prisma } from '../../db'
import Stripe from 'stripe'

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const stripe = new Stripe(secretKey!, { apiVersion: '2025-01-27.acacia' })

export const validateProductAndPrices = async (): Promise<void> => {
  const stripePrices = await stripe.prices.list()
  const stripeProducts = await stripe.products.list()

  const priceIds = stripePrices.data.map(p => p.id)
  const productIds = stripeProducts.data.map(p => p.id)

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  if (!priceIds.includes(productPrice1!)) {
    throw new Error(`Invalid price ID for product 1: ${productPrice1}`)
  }
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  if (!priceIds.includes(productPrice2!)) {
    throw new Error(`Invalid price ID for product 2: ${productPrice2}`)
  }
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  if (!productIds.includes(product1!)) {
    throw new Error(`Invalid product ID for product 1: ${product1}`)
  }
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  if (!productIds.includes(product2!)) {
    throw new Error(`Invalid product ID for product 2: ${product2}`)
  }
}

export const paymentsRouter = express.Router()

paymentsRouter.use((err: ErrorType, req: Request, res: Response, next: express.NextFunction) => { apiErrorHandler(err, req, res, next) })

/**
 * @swagger
 * /api/payments/checkout/{id}:
 *   post:
 *     summary: Crea un pagamento con Stripe per il prodotto selezionato
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product id.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - quantity
 *             properties:
 *               quantity:
 *                 type: integer
 *                 description: La quantità del prodotto da acquistare
 *                 example: 1
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             type: object
 *             properties:
 *               url:
 *                 type: string
 *                 example: https://url.com
 *       500:
 *         description: Errore del server.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaymentError'
 *     tags:
 *       - Payments
 *     security:
 *       - Authorization: []
 */
paymentsRouter.post('/checkout/:id', asyncErrWrapper(async (req, res) => {
  try {
    const userId = await verifyAndDecodeToken(req.headers.authorization)
    const id = req.params.id
    if (id < '1' || id > '2') {
      const e = new Error(`Product id ${id} requested, is invalid`)
      const { status, error } = formatError(e, '003-RESPONSE', 'paymentsRouter order-status')
      res.status(status).json(error)
    }
    const getCheckoutTimestamp = performance.now()
    const price = id === '1' ? productPrice1 : productPrice2
    const productId = id === '1' ? product1 : product2
    Logger.writeEvent(`User ${userId} is checking out product ${productId}`)
    // check if product exists and is available. retrieve its price id
    const session = await stripe.checkout.sessions.create({
      line_items: [{ quantity: 1, price }],
      mode: 'subscription',
      client_reference_id: userId,
      success_url: successUrl,
      cancel_url: cancelUrl
    })
    const fulfilledSession = await fulfillCheckout(session.id)
    const fetchTime = Math.round(performance.now() - getCheckoutTimestamp)
    Logger.writeEvent(`List: fetch checkoutTimestamp in ${fetchTime} ms`)
    Logger.writeEvent(`Moving user to ${fulfilledSession.url}`)
    return res.status(200).json({ url: fulfilledSession.url })
  } catch (e) {
    const { status, error } = formatError(e as Error, '001-RESPONSE', 'paymentsRouter checkout post')
    return res.status(status).json(error)
  }
})
)

const fulfillCheckout = async (sessionId: string): Promise<Stripe.Checkout.Session> => {
  Logger.writeEvent(`Fulfilling Checkout Session ${sessionId}`)

  const existingOrder = await prisma.order.findUnique({ where: { sessionId } })
  if (Boolean((existingOrder?.fulfilled))) {
    Logger.writeEvent(`Checkout Session ${sessionId} was already fulfilled.`)
    return existingOrder as unknown as Stripe.Checkout.Session
  }

  const checkoutSession = await stripe.checkout.sessions.retrieve(sessionId, { expand: ['line_items'] })
  if (checkoutSession.payment_status === 'paid') {
    Logger.writeEvent(`Processing order for session: ${sessionId}`)

    await prisma.order.create({
      data: {
        sessionId,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        userId: checkoutSession.client_reference_id!,
        items: checkoutSession.line_items as unknown as object,
        customerId: checkoutSession.customer as string,
        productId: (checkoutSession.line_items?.data[0].price?.product ?? '') as unknown as string, // N.B. here you can save the product info you need
        fulfilled: true
      }
    })

    Logger.writeEvent(`Checkout Session ${sessionId} has been fulfilled`)
  }

  return checkoutSession
}

paymentsRouter.post('/webhook', asyncErrWrapper(async (req, res) => {
  let event = req.body
  const signature = req.headers['stripe-signature']
  if (stripeWebhookSecret != null && signature !== undefined) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      event = stripe.webhooks.constructEvent(req.body, signature, stripeWebhookSecret)
    } catch (e) {
      const error = new Error('Invalid Stripe signature')
      Logger.writeException(error, '002-RESPONSE', 'paymentsRouter webhook post')
      return res.status(400).json(e)
    }
  }
  const eventType: StripeEventType = event.type
  Logger.writeEvent(`Received event: ${eventType}`)
  try {
    switch (eventType) { // Whole list of events found here https://docs.stripe.com/api/events/types
      case 'payment_intent.succeeded':
        // Object is [payment_intent](https://docs.stripe.com/api/payment_intents/object). This event is used to confirm a payment.
        break
      case 'setup_intent.created':
        // Object is [setup_intent](https://docs.stripe.com/api/setup_intents/object). This event is used to confirm a payment method, here customer, client_reference_id and payment_method are null.
        break
      case 'setup_intent.succeeded':
        // Object is [setup_intent](https://docs.stripe.com/api/setup_intents/object).. This event is used to confirm a payment method, here customer and client_reference_id are null, payment_method is set.
        break
      case 'checkout.session.completed':
        // Object is [checkout.session](https://docs.stripe.com/api/checkout/sessions/object). The checkout session is completed (.id), here we can fulfill the order, customer is set, client_reference_id is set, subscription and invoice are set.
        // eslint-disable-next-line max-len
        Logger.writeEvent(`Received checkout.session.completed of user ${event.data.object.client_reference_id}, customer ${event.data.object.customer} for ${event.data.object.id}`)
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        await fulfillCheckout(event.data.object.id)
        break
      case 'customer.created':
        // Object type is [customer](https://docs.stripe.com/api/customers/object). this event is used to create customer, here customer is set (.id) there's email and other props, client_reference_id is null.
        break
      case 'payment_method.attached':
        // Object type is [payment_method](https://docs.stripe.com/api/payment_methods/object). this event is used to attach a payment method to a customer, here customer is set, payment_method (id) is set, client_reference_id is null.
        break
      case 'customer.updated':
        // Object type is [customer](https://docs.stripe.com/api/customers/object). this event is used to update a customer, here customer is set, client_reference_id is null.
        break
      case 'invoice.created':
        // Object type is [invoice](https://docs.stripe.com/api/invoices/object). this event is used to create an invoice, here customer is set, client_reference_id is null. There are hosted_invoice_url, invoice_pdf, subscription and other props.
        break
      case 'invoice.finalized':
        // Object type is [invoice](https://docs.stripe.com/api/invoices/object). this event is used to finalize an invoice, here customer is set, client_reference_id is null. There are hosted_invoice_url, invoice_pdf, subscription and other props.
        break
      case 'invoice.paid':
        // Object type is [invoice](https://docs.stripe.com/api/invoices/object). this event is used to mark an invoice as paid, here customer is set, client_reference_id is null. There are hosted_invoice_url, invoice_pdf, subscription and other props.
        break
      case 'invoice.payment_succeeded':
        // Object type is [invoice](https://docs.stripe.com/api/invoices/object). this event is used to register that the invoice is paid, here customer is set, client_reference_id is null. There are hosted_invoice_url, invoice_pdf, subscription and other props.
        break
      case 'customer.subscription.created':
        // Object type is [subscription](https://docs.stripe.com/api/subscriptions/object). this event is used to create a subscription, here customer is set, payment methos (.default_payment_method) is set, client_reference_id is null. There are subscription (.id), list of items bought, latest_invoice, plan (with price) and other props.
        break
      default:
        break
    }
    res.json({ received: true })
  } catch (e) {
    const { status, error } = formatError(e as Error, '002-RESPONSE', 'paymentsRouter webhook post')
    return res.status(status).json(error)
  }
}))

/**
 * @swagger
 * /api/payments/order-status/{productId}:
 *   get:
 *     summary: Verifica se l'utente ha pagato per un prodotto
 *     description: Controlla se esiste un ordine pagato per il prodotto specificato, verificando che sia stato effettuato entro l'ultimo mese.
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         description: ID del prodotto da verificare
 *         schema:
 *           type: string
 *           example: 1
 *     responses:
 *       200:
 *         description: Restituisce se l'utente ha pagato per il prodotto specificato
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 hasPaid:
 *                   type: boolean
 *       400:
 *         description: Errore nella richiesta
 *       401:
 *         description: Utente non autorizzato
 *       500:
 *         description: Errore interno del server
 *     tags:
 *       - Payments
 *     security:
 *       - Authorization: []
 */
paymentsRouter.get('/order-status/:productId', asyncErrWrapper(async (req, res) => {
  try {
    const userId = await verifyAndDecodeToken(req.headers.authorization)
    const id = req.params.productId
    if (id < '1' || id > '2') {
      const e = new Error(`Product id ${id} requested, is invalid`)
      const { status, error } = formatError(e, '003-RESPONSE', 'paymentsRouter order-status')
      return res.status(status).json(error)
    }
    const productId = id === '1' ? product1 : product2

    const oneMonthAgo = new Date()
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1)

    const existingOrder = await prisma.order.findFirst({
      where: {
        userId,
        productId,
        fulfilled: true,
        createdAt: { gte: oneMonthAgo }
      }
    })

    return res.status(200).json({ hasPaid: existingOrder != null })
  } catch (e) {
    const { status, error } = formatError(e as Error, '003-RESPONSE', 'paymentsRouter order-status')
    return res.status(status).json(error)
  }
}))
