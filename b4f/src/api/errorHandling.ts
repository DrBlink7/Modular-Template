import { Logger } from '../logger'
import { type Request, type Response, type NextFunction } from 'express'
import { type ErrorType, type ErrorPayload } from './types'
import { type FunType } from '../types'
import { load } from 'cheerio'

const token401 = 'Token used too late'

export const formatError = (
  error: ErrorType,
  code: string = '001-Unknown',
  handledAt?: string
): ErrorPayload => {
  if (error.response !== null && error.response !== undefined) {
    return error.response.data !== null && error.response.data !== undefined
      ? formatResponseData(error, code, handledAt)
      : formatErrorCode(error, code, handledAt)
  } else {
    return formatInternalError(error, code, handledAt, error?.message?.indexOf(token401) >= 0 ? 401 : 500)
  }
}

export const apiErrorHandler = (err: ErrorType, _req: Request, res: Response, _next: NextFunction): Response<unknown, Record<string, unknown>> => {
  if ((err.response?.data !== null && err.response.data !== undefined)) {
    Logger.writeException(new Error(toString(err.response.data)), '001-Unknown', 'apiErrorHandler')
    return res
      .status(err.response.status as number)
      .json({ message: err.message, response: err.response.data })
  } else {
    Logger.writeException(new Error(toString(err)), '001-Unknown', 'apiErrorHandler')
    return res.status(400).json({ message: 'Default error message' + err })
  }
}

export const asyncErrWrapper =
  (fun: FunType) => (req: Request, res: Response, next: NextFunction) => {
    // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
    Promise.resolve(fun(req, res, next)).catch(next)
  }

const logResposeData = (handledAt: string | undefined, error: unknown, code: string): void => {
  handledAt !== undefined && handledAt !== ''
    ? Logger.writeException(new Error(toString(error)), code, handledAt)
    : Logger.writeException(new Error(toString(error)), code)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const logResponseCode = (handledAt: string | undefined, error: any, code: string): void => {
  handledAt !== undefined && handledAt !== ''
    ? Logger.writeException(new Error(`OuterAPIs error code: ${(error?.code) ?? '000-CODE missing'}`), code, handledAt)
    : Logger.writeException(new Error(`OuterAPIs error code: ${(error?.code) ?? '000-CODE missing'}`), code)
}

const logSimpleError = (handledAt: string | undefined, error: string, code: string): void => {
  handledAt !== undefined && handledAt !== ''
    ? Logger.writeException(new Error(error), code, handledAt)
    : Logger.writeException(new Error(error), code)
}

const formatInternalError = (error: ErrorType, code: string, handledAt: string | undefined, status: number): ErrorPayload => {
  const message = toString(error)
  logSimpleError(handledAt, message, code)
  return {
    status,
    error: { code, message }
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const formatErrorCode = (error: any, code: string, handledAt: string | undefined): ErrorPayload => {
  logResponseCode(handledAt, error, code)
  return {
    status: error?.response?.status ?? 500,
    error: {
      code,
      message: error.code ?? '000-CODE Missing'
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const formatResponseData = (error: any, code: string, handledAt: string | undefined): ErrorPayload => {
  const data: DataMessage = (error.response.data.message ?? error.response.data) satisfies DataMessage
  const message = formatMessageData(data)

  logResposeData(handledAt, message, code)
  return {
    status: error?.response?.status ?? 500,
    error: {
      code,
      message
    }
  }
}

type DataMessage = string | string[] | null | undefined

const formatMessageData = (data: DataMessage): string => {
  if (data === null || data === undefined) return 'Missing Error Information'

  if (typeof data !== 'string') {
    if (typeof data === 'object') {
      return JSON.stringify(data)
    } else {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (data as unknown as any).toString()
    }
  }
  if (data.includes('doctype')) { return getTextFromHTML(data, 'p') }
  if (data.includes('DOCTYPE')) { return getTextFromHTML(data, 'pre') }
  if (data.includes('html')) { return getTextFromHTML(data, 'html') }

  return data
}

const getTextFromHTML = (data: string | Buffer, tag: string): string => {
  const $ = load(data)
  const textInsideTag = $(tag).text()

  return textInsideTag ?? 'Server Error'
}

const toString = (data: unknown): string => {
  if (typeof data === 'string') return data
  if (typeof data === 'object') {
    if (data !== null && 'message' in data) { return toString(data.message) }
    return JSON.stringify(data)
  } else {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (data as unknown as any).toString()
  }
}
