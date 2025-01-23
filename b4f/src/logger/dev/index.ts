/* eslint-disable @typescript-eslint/space-before-function-paren */
/* eslint-disable @typescript-eslint/indent */
import { type ILogger } from '..'

export class DevLogger implements ILogger {
  writeTrace(message: string, severityLevel: number, err?: string): void {
    const trace =
      (err != null)
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
  }

  writeException(
    err: Error,
    code: string = '000-Unknown',
    prop: string = 'unhandled'
  ): void {
    console.error({
      properties: { code, handledAt: prop },
      error: err.message
    })
  }

  writeEvent(name: string): void {
    console.info({ name })
  }
}
