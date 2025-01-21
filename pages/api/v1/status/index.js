import database from "../../../../infra/database";

async function status(request, response) {
  const resultado = await database.query("SELECT 1 + 1 as sum;");
  console.log(resultado);

  response.status(200).json({ NOME: "JESSÉ" });
}

export default status;
