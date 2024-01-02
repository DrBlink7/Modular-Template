import { DbName, tableVersion } from "../../config";
import { dbConfig } from ".";

export const getVersion = async () => {
  try {
    const client = await dbConfig.connect();
    const results = await client.query(
      `SELECT * FROM ${DbName}.${tableVersion}`
    );
    client.release();

    return results.rows;
  } catch (error) {
    throw error;
  }
};
