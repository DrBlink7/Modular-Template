export interface ErrorPayload {
  status: number
  error: { message: string, code: string }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ErrorType = any

export type StripeEventType =
  'setup_intent.succeeded'
  | 'setup_intent.created'
  | 'checkout.session.completed'
  | 'customer.created'
  | 'payment_method.attached'
  | 'customer.updated'
  | 'invoice.created'
  | 'invoice.finalized'
  | 'invoice.paid'
  | 'invoice.payment_succeeded'
  | 'customer.subscription.created'
  | 'payment_intent.succeeded'
  | string
