export interface ErrorPayload {
  status: number
  error: { message: string, code: string }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ErrorType = any
