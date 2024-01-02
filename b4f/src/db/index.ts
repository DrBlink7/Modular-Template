import { DbType } from "../config";
import { dbConnectorPostgreDb } from "./postgreDb";

export const dbFactory = (dbType: DbType): Connector => {
  if (dbType === "postgre") return dbConnectorPostgreDb;

  throw new Error("DB type not supported: " + dbType);
};

export type Connector = {
  initDb: () => Promise<string>;
};
