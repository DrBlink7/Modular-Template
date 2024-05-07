import { CorsHost, ServerPort, DbName, DbPort, RepositoryType, DbHost, DbPass } from './config'
import { apiRouter } from './api'
import { Logger, loggerInit } from './logger'
import { swaggerSpec } from './swagger'
import cors from 'cors'
import express from 'express'
import nocache from 'nocache'
import compression from 'compression'
import swaggerUi from 'swagger-ui-express'

loggerInit()

const app = express()
app.use(compression())

if (CorsHost !== '') {
  app.use(cors())
  app.options(CorsHost, cors())
}

app.use(express.json())

app.use(express.urlencoded({ extended: false }))
app.use(nocache())

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
app.use('/api', apiRouter)

const server = app.listen(ServerPort, () => { Logger.writeEvent('B4F is listening on port ' + ServerPort) }
)

server.on('error', (error) => { Logger.writeException(error) })

try {
  if (DbHost === undefined || DbName === undefined || DbPort === undefined || RepositoryType === undefined || DbPass === undefined) {
    Logger.writeException(
      new Error('Db connection not valid...'),
      'index.ts/Env_Const_Check'
    )
    server.close(() => {
      Logger.writeEvent('B4F shutdown.')
      return process.exit(0)
    })
  }
} catch (e) {
  Logger.writeException(e as Error, '002-DB', 'index.ts/Env_Const_Check')
}
