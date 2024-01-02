export type ErrorPayload = {
  status: number;
  error: { message: string; code: string };
};

export type ErrorType = any;
