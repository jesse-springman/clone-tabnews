import { Client } from "pg";
import { ServicesError } from "./erros.js";

async function query(queryObject) {
  let client;
  try {
    client = await getNewClient();
    const resultado = await client.query(queryObject);
    return resultado;
  } catch (error) {
    const errorService = new ServicesError({
      message: "Erro na conexão com o Banco de Dados ou na Query",
      cause: error,
    });

    throw errorService;
  } finally {
    await client?.end();
  }
}

async function getNewClient() {
  const useSSL =
    process.env.PGSSL === "true" ? { rejectUnauthorized: false } : false;

  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    ssl: useSSL,
  });

  await client.connect();
  return client;
}

const database = {
  query,
  getNewClient,
};

export default database;
