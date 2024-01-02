import { EnvironmentName, Version } from "../config";
import { DevLogger } from "./dev";

export interface ILogger {
  writeTrace(message: string, severityLevel: number, err?: string): void;
  writeException(err: Error, code?: string, prop?: string): void;
  writeEvent(name: string): void;
}
export let Logger: ILogger;

export const loggerInit = () => {
  initLogger();
};

const initLogger = () => {
  if (!EnvironmentName) {
    console.error(
      "The environment Variable 'ENVIRONMENT_NAME' is not valorized, please assign a value. Server is shutting down."
    );
    process.exitCode = 1;

    return process.exit();
  }
  const client = {
    cloudRole: "b4f",
    applicationVersion: Version,
    cloudRoleInstance: EnvironmentName,
  };

  switch (EnvironmentName) {
    case "dev":
      Logger = new DevLogger();
      break;
  }

  console.info({ name: "Logger initialized" });
  console.info({ name: client });
};
