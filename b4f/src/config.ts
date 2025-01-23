import dotenv from 'dotenv'
dotenv.config()

export type DbType = keyof typeof CryptoTypeEnum
enum CryptoTypeEnum {
  'postgres' = 'postgres',
  'firebase' = 'firebase',
}
export type EnvType = keyof typeof EnvTypeEnum
enum EnvTypeEnum {
  'dev' = 'dev',
  'prod' = 'prod',
  'qa' = 'qa',
}

export const CorsHost = process.env.ENABLE_CORS ?? '*'
export const ServerPort = process.env.SERVER_PORT ?? 3001
export const DbHost = process.env.DB_HOST
export const DbName = process.env.DB_NAME
export const DbUser = process.env.DB_USER
export const DbPass = process.env.DB_PASS
export const DbPort = process.env.DB_PORT
export const EnvironmentName = process.env.ENVIRONMENT_NAME as EnvType ?? 'dev'
// eslint-disable-next-line @typescript-eslint/no-var-requires
export const Version = require('../package.json').version
export const RepositoryType = process.env.REPOSITORY_TYPE as DbType ?? 'postgres'
export const secretKey = process.env.STRIPE_SECRET_KEY
