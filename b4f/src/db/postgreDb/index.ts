import { DbPort, Host } from "../../config";
import { Connector } from "..";
import { Pool } from "pg";
import { init } from "./init";

export const dbConfig = new Pool({
  user: "dev",
  host: Host,
  database: "postgres",
  password: "devPassword",
  port: Number(DbPort),
});

export const dbConnectorPostgreDb: Connector = {
  initDb: init,

};
