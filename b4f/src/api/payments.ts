/* eslint-disable @typescript-eslint/no-misused-promises */
import express, { type Request, type Response } from 'express'
import { Logger } from '../logger'
import { secretKey } from '../config'
import { type ErrorType } from './types'
import { apiErrorHandler, asyncErrWrapper, formatError } from './errorHandling'
import { verifyAndDecodeToken } from './utils'
import Stripe from 'stripe'

if (secretKey == null) {
  const error = new Error('Stripe secret key is not provided')
  Logger.writeException(error, '000-ENVVAR', 'init')
  throw error
}
const stripe = new Stripe(secretKey, { apiVersion: '2024-12-18.acacia' })

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
 *       204:
 *         description: Success
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
    const productId = req.params.id
    const getCheckpointTimestamp = performance.now()
    console.log(`User ${userId} is checking out product ${productId}`)
    const fetchTime = Math.round(performance.now() - getCheckpointTimestamp)
    Logger.writeEvent(`List: fetch checkpoint in ${fetchTime} ms`)
    return res.status(204).json()
  } catch (e) {
    const { status, error } = formatError(e as Error, '001-RESPONSE', 'apiRouter checkpoint get')
    return res.status(status).json(error)
  }
})
)
/**
 * @swagger
 * /api/payments/create-payment-intent:
 *  post:
 *    summary: Crea un PaymentIntent con Stripe
 *    description: Genera un PaymentIntent per iniziare un pagamento con Stripe
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - amount
 *              - currency
 *            properties:
 *              amount:
 *                type: integer
 *                description: L'importo del pagamento in centesimi (es. 1000 per 10.00€)
 *                example: 1000
 *              currency:
 *                type: string
 *                description: La valuta del pagamento (es. "eur")
 *                example: "eur"
 *    responses:
 *      200:
 *        description: PaymentIntent creato con successo
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                clientSecret:
 *                  type: string
 *                  description: Il client secret del PaymentIntent
 *                  example: "pi_1234567890_secret_ABC"
 *      400:
 *        description: Errore nella richiesta (parametri mancanti o non validi)
 *      500:
 *        description: Errore interno del server
 *    tags:
 *      - Pagamenti
 */
paymentsRouter.post('/create-payment-intent', asyncErrWrapper(async (req, res) => {
  try {
    const { amount, currency } = req.body
    if (!(Boolean(amount)) || !(Boolean(currency))) {
      return res.status(400).json({ error: 'Missing required parameters: amount and currency' })
    }
    const paymentIntent = await stripe.paymentIntents.create({ amount, currency })
    return res.json({ clientSecret: paymentIntent.client_secret })
  } catch (error) {
    console.error('Error creating PaymentIntent:', error)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}))
