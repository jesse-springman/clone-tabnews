import { Client } from "pg"; //Chamando o "{Client} do modulo "pg"

async function query(queryObject) {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORTS,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
  });

  try {
    await client.connect();
    const resultado = await client.query(queryObject);
    return resultado;
  } catch (error) {
    console.log(error);
  } finally {
    await client.end(); //Desconectando do banco, função mandatoria no final de todas as query para não ocasionar uma conexão pendurada()
  }
}

export default {
  query: query,
};
