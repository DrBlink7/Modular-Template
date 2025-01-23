/* eslint-disable @typescript-eslint/no-misused-promises */
import express, { type Request, type Response } from 'express'
import { type ErrorType } from './types'
import { secretKey, ServerPort } from '../config'
import { Logger } from '../logger'
import { apiErrorHandler, asyncErrWrapper } from './errorHandling'
import Stripe from 'stripe'

export const apiRouter = express.Router()

apiRouter.use((err: ErrorType, req: Request, res: Response, next: express.NextFunction) => { apiErrorHandler(err, req, res, next) })
/**
 * @swagger
 * /api/healthcheck:
 *  get:
 *    summary: Verifica se il server è attivo
 *    responses:
 *      200:
 *        description: Il server è attivo
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *    tags:
 *      - Healthcheck
 */
apiRouter.get('/healthcheck', (_req: Request, res: Response) => {
  res.json({ message: `I'm alive and answering on port ${ServerPort}` })
})

if (secretKey == null) {
  throw new Error('Stripe secret key is not provided')
}

const stripe = new Stripe(secretKey, { apiVersion: '2024-12-18.acacia' })

/**
 * @swagger
 * /api/create-payment-intent:
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
apiRouter.post('/create-payment-intent', asyncErrWrapper(async (req, res) => {
  try {
    const { amount, currency } = req.body

    if (!(Boolean(amount)) || !(Boolean(currency))) {
      return res.status(400).json({ error: 'Missing required parameters: amount and currency' })
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency
    })

    return res.json({ clientSecret: paymentIntent.client_secret })
  } catch (error) {
    console.error('Error creating PaymentIntent:', error)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}))

apiRouter.use((req, _res, next) => {
  Logger.writeEvent(`Received ${req.method} request to ${req.path}`)
  next()
})
