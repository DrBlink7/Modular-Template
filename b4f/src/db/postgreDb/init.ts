import { dbConfig } from ".";
import { PoolClient } from "pg";
import {
  DbName,
  RepositoryType,
  DbSchema,
  tableVersion,
} from "../../config";

const CreateDbProcedure = `
CREATE OR REPLACE FUNCTION CreateDbTables() RETURNS VOID AS $$
BEGIN
  BEGIN
    EXECUTE 'DROP TABLE IF EXISTS ' || '${DbName}' || '.${tableVersion} CASCADE';

  EXCEPTION
    WHEN OTHERS THEN
  END;

  CREATE TABLE IF NOT EXISTS ${DbName}.${tableVersion} (
    version NUMERIC NOT NULL
  );

  INSERT INTO ${DbName}.${tableVersion} (version) VALUES (1);

    RETURN;
END;
$$ LANGUAGE plpgsql;
`;

const InitDB = `SELECT CreateDbTables();`;

const createDbDatabase = async () => {
  const client = await dbConfig.connect();
  try {
    const existsQuery = await client.query(
      `SELECT datname FROM pg_database WHERE datname = '${DbName}'`
    );
    if (existsQuery.rows.length === 0) {
      await client.query(`CREATE DATABASE ${DbName}`);
      await client.query(`CREATE SCHEMA ${DbSchema}`);
    }
  } finally {
    client.release();
  }
};

export const init = async () => {
  let client: PoolClient | null = null;
  try {
    client = await dbConfig.connect();
    await createDbDatabase();
    await client.query(CreateDbProcedure);
    await client.query(InitDB);

    return `InitDB ${RepositoryType} success.`;
  } catch (error) {
    throw error;
  } finally {
    if (client) {
      client.release();
    }
  }
};
