import { corsHost, serverPort, dbUrl, productPrice1, productPrice2, authUrl, secretKey, product1, product2 } from './config'
import { apiRouter } from './api'
import { Logger, loggerInit } from './logger'
import { swaggerSpec } from './swagger'
import { validateProductAndPrices } from './api/routers/payments'
import cors from 'cors'
import express from 'express'
import nocache from 'nocache'
import compression from 'compression'
import swaggerUi from 'swagger-ui-express'

loggerInit()

const app = express()
app.use(compression())

if (corsHost !== '') {
  app.use(cors())
}

app.use('/api/payments/webhook', express.raw({ type: 'application/json' }))
app.use(express.json())

app.use(express.urlencoded({ extended: false }))
app.use(nocache())

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
app.use('/api', apiRouter)

const server = app.listen(serverPort, () => { Logger.writeEvent(`Backend is listening on port ${serverPort}`) })

server.on('error', (error: Error) => { Logger.writeException(error) })
try {
  if (dbUrl == null) {
    Logger.writeException(new Error('Db connection not valid...'), '000-ENVVAR', 'index.ts/Env_Const_Check')
    server.close(() => {
      Logger.writeEvent('Backend shutdown.')
      return process.exit(0)
    })
  }
  if (authUrl == null) {
    const error = new Error('Auth URL is not provided')
    Logger.writeException(error, '000-ENVVAR', 'index.ts/Env_Const_Check')
    server.close(() => {
      Logger.writeEvent('Backend shutdown.')
      return process.exit(0)
    })
  }
  if (secretKey == null) {
    const error = new Error('Stripe secret key is not provided')
    Logger.writeException(error, '000-ENVVAR', 'index.ts/Env_Const_Check')
    server.close(() => {
      Logger.writeEvent('Backend shutdown.')
      return process.exit(0)
    })
  }
  if (productPrice1 == null || productPrice2 == null || product1 == null || product2 == null) {
    const error = new Error('You need to set product id and price id for product 1 and product 2 in your env vars')
    Logger.writeException(error, '000-ENVVAR', 'index.ts/Env_Const_Check')
    server.close(() => {
      Logger.writeEvent('Backend shutdown.')
      return process.exit(0)
    })
  }
  validateProductAndPrices()
    .then(() => { Logger.writeEvent('Stripe Product and Price ids are set correctly') })
    .catch(err => {
      Logger.writeException(err as Error, '008-VALIDATION', 'index.ts/Env_Const_Check')
      server.close(() => {
        Logger.writeEvent('Backend shutdown.')
        return process.exit(0)
      })
    })
} catch (e) {
  Logger.writeException(e as Error, '002-DB', 'index.ts/Env_Const_Check')
}
