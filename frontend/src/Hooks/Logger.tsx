/* eslint-disable @typescript-eslint/indent */
import { type FC, createContext, useContext } from 'react'
import { type WithChildren } from '../exportedTypes'

interface ILogger {
  writeTrace: (message: string, severityLevel: number, err?: string) => void
  writeException: (err: Error, code?: string, prop?: string) => void
  writeEvent: (name: string) => void
}

const LoggerContext = createContext<ILogger | undefined>(undefined)

export const useLogger = (): ILogger => {
  const context = useContext(LoggerContext)
  if (context == null) {
    throw new Error('useLogger must be used within a LoggerProvider')
  }

  return context
}

const LoggerProvider: FC<WithChildren> = ({ children }) => {
  const logger: ILogger = {
    writeTrace: (message, severityLevel, err) => {
      const trace = (err != null)
        ? {
          message,
          severity: severityLevel,
          properties: {
            stack: err
          }
        }
        : {
          message,
          severity: severityLevel
        }
      console.info(trace)
    },
    writeException: (err, code = '000-Unknown', prop = 'unhandled') => {
      console.error({
        properties: { code, handledAt: prop },
        error: err.message
      })
    },
    writeEvent: (name) => {
      console.info({ name })
    }
  }

  return (
    <LoggerContext.Provider value={logger}>{children}</LoggerContext.Provider>
  )
}

export default LoggerProvider
