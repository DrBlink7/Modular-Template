import { type DbType } from '../config'
import { dbConnectorPostgreDb } from './postgreDb'

export const dbFactory = (dbType: DbType): Connector => {
  if (dbType === 'postgres') return dbConnectorPostgreDb

  throw new Error('DB type not supported: ' + dbType)
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Connector {
}
