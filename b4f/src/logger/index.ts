/* eslint-disable indent */
import { environmentName, version } from '../config'
import { DevLogger } from './dev'
import { ProdLogger } from './prod'

export interface ILogger {
  writeTrace: (message: string, severityLevel: number, err?: string) => void
  writeException: (err: Error, code?: string, prop?: string) => void
  writeEvent: (name: string) => void
}
export let Logger: ILogger

export const loggerInit = (): void => {
  initLogger()
}

const initLogger = (): void => {
  if (environmentName == null) {
    console.error("The environment Variable 'ENVIRONMENT_NAME' is not valorized, please assign a value. Server is shutting down.")
    return process.exit(0)
  }

  switch (environmentName) {
    case 'dev':
      Logger = new DevLogger()
      break
    case 'qa':
    case 'prod':
      Logger = new ProdLogger()
      break
    default:
      Logger = new DevLogger()
      break
  }
  Logger.writeEvent(`Logger initialized on backend version ${version} on ${environmentName} environment`)
}
