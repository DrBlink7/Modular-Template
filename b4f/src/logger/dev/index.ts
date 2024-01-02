import { ILogger } from "..";

export class DevLogger implements ILogger {
  writeTrace(message: string, severityLevel: number, err?: string) {
    const trace = err
      ? {
          message: message,
          severity: severityLevel,
          properties: {
            stack: err,
          },
        }
      : {
          message: message,
          severity: severityLevel,
        };
    console.info(trace);
  }
  writeException(
    err: Error,
    code: string = "000-Unknown",
    prop: string = "unhandled"
  ) {
    console.error({
      properties: { code: code, handledAt: prop },
      error: err.message,
    });
  }
  writeEvent(name: string) {
    console.info({ name: name });
  }
}
