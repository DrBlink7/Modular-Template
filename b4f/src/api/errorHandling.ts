import { Logger } from "../logger";
import { Request, Response, NextFunction } from "express";
import { ErrorType, ErrorPayload } from "./types";
import { FunType } from "../types";
import { load } from 'cheerio'

export const formatError = (
  error: ErrorType,
  code: string = "000-Unknown",
  handledAt?: string
): ErrorPayload => {
  if (error.response)
    return error.response.data
      ? formatResponseData(error, code, handledAt)
      : formatToJsonError(error, code, handledAt);
  else
    return formatInternalError(error, code, handledAt);
};

export const apiErrorHandler = (
  err: ErrorType,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (err.response) {
    Logger.writeException(err.response.data, "000-Unknown", "apiErrorHandler");
    return res
      .status(err.response.status)
      .json({ message: err.message, response: err.response.data });
  } else {
    Logger.writeException(err, "000-Unknown", "apiErrorHandler");
    return res.status(400).json({ message: "Default error message" + err });
  }
};

export const asyncErrWrapper =
  (fun: FunType) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fun(req, res, next)).catch(next);
  };

const logResposeData = (
  handledAt: string | undefined,
  error: any,
  code: string
) => handledAt
    ? Logger.writeException(new Error(error), code, handledAt)
    : Logger.writeException(error, code);

const logToJsonResponse = (
  handledAt: string | undefined,
  error: any,
  code: string
) =>
  handledAt
    ? Logger.writeException(error.toJSON(error.response), code, handledAt)
    : Logger.writeException(error.toJSON(error.response), code);

const logSimpleError = (
  handledAt: string | undefined,
  error: any,
  code: string
) =>
  handledAt
    ? Logger.writeException(error, code, handledAt)
    : Logger.writeException(error, code);

const formatInternalError = (
  error: any,
  code: string,
  handledAt: string | undefined
): ErrorPayload => {
  const message = error.toString()
  logSimpleError(handledAt, message, code);
  return {
    status: 500,
    error: { code: code, message },
  };
};

const formatToJsonError = (
  error: any,
  code: string,
  handledAt: string | undefined
): ErrorPayload => {
  logToJsonResponse(handledAt, error, code);
  return {
    status: error.response.status,
    error: {
      code: code,
      message: error.toJSON(error.response),
    },
  };
};

const formatResponseData = (
  error: any,
  code: string,
  handledAt: string | undefined
): ErrorPayload => {
  const data = error.response.data.message ? error.response.data.message : error.response.data
  const message = data.includes('doctype')
    ? getTextFromHTML(data, 'p')
    : data.includes('DOCTYPE')
      ? getTextFromHTML(data, 'pre')
      : data.toString();

  logResposeData(handledAt, message, code);
  return {
    status: error.response.status,
    error: {
      code: code,
      message: message,
    },
  };
};

const getTextFromHTML = (data: any, tag: string) => {
  const $ = load(data);
  const textInsideTag = $(tag).text();

  return textInsideTag ?? 'Generic Error'
}
