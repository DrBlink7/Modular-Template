/* eslint-disable @typescript-eslint/no-misused-promises */
import express, { type Request, type Response } from 'express'
import { type ErrorType } from './types'
import { serverPort } from '../config'
import { Logger } from '../logger'
import { apiErrorHandler } from './errorHandling'
import { paymentsRouter } from './routers/payments'

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
  res.json({ message: `I'm alive and answering on port ${serverPort}` })
})

apiRouter.use((req, _res, next) => {
  Logger.writeEvent(`Received ${req.method} request to ${req.path}`)
  next()
})

apiRouter.use('/payments', paymentsRouter)
// apiRouter.get('/sse', sseHandler)
// apiRouter.options('/sse', sseHandler)
