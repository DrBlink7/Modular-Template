import dotenv from "dotenv";
dotenv.config();

export type DbType = keyof typeof CryptoTypeEnum;
enum CryptoTypeEnum {
  "postgre" = "postgre",
  "firebase" = "firebase",
}
export type EnvType = keyof typeof EnvTypeEnum;
enum EnvTypeEnum {
  "dev" = "dev",
  "prod" = "prod",
  "qa" = "qa",
}

export const CorsHost = process.env.ENABLE_CORS || "*";
export const ServerPort = process.env.SERVER_PORT || 3001;
export const Host = process.env.HOST;
export const DbName = process.env.DB_NAME || "media";
export const DbSchema = process.env.DB_SCHEMA || DbName;
export const DbPort = process.env.DB_PORT;
export const EnvironmentName =
  (process.env.ENVIRONMENT_NAME as EnvType) || "dev";
export const Version = require("../package.json").version;
export const RepositoryType =
  (process.env.REPOSITORY_TYPE as DbType) || "postgre";
export const tableVersion = "version";