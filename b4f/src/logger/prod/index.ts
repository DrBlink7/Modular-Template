/* eslint-disable @typescript-eslint/space-before-function-paren */
/* eslint-disable @typescript-eslint/indent */
import { type ILogger } from '..'
import pino from 'pino'

const logger = pino({
  level: 'info',
  transport: {
    target: 'pino-pretty',
    options: { colorize: true }
  }
})

export class ProdLogger implements ILogger {
  writeTrace(message: string, severityLevel: number, err?: string): void {
    if (severityLevel === 0) {
      logger.trace({ err }, message)
    } else if (severityLevel === 1) {
      logger.info({ err }, message)
    } else if (severityLevel === 2) {
      logger.warn({ err }, message)
    } else if (severityLevel === 3) {
      logger.error({ err }, message)
    }
  }

  writeException(
    err: Error,
    code: string = '000-Unknown',
    prop: string = 'unhandled'
  ): void {
    logger.error({
      err,
      code,
      path: prop
    }, err.message)
  }

  writeEvent(name: string): void {
    logger.info({ name })
  }
}
