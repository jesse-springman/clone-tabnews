import { Client } from "pg"; //Chamando o "{Client} do modulo "pg"

async function query(queryObject) {
  let client;
  try {
    client = await getNewClient();
    const resultado = await client.query(queryObject);
    return resultado;
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    await client.end(); //Desconectando do banco, função mandatoria no final de todas as query para não ocasionar uma conexão pendurada()
  }
}

async function getNewClient() {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORTS,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    ssl: process.env.NODE_ENV === "production",
  });

  await client.connect();
  return client;
}

const database = {
  query,
  getNewClient,
};

export default database;
