import useSWR from "swr";

async function fetchAPI(key) {
  const response = await fetch(key);
  const responseBody = await response.json();
  return responseBody;
}

export default function StatusPage() {
  return (
    <>
      <h1>Status</h1>
      <UpdateAlt />
    </>
  );
}

function UpdateAlt() {
  const { data, isLoading } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  let updateAltText = "Carregando";
  let numerosDeConexoes;
  let numerosDeConexoesAbertas;
  let versaoNode;

  if (!isLoading && data) {
    updateAltText = new Date(data.uptade_alt).toLocaleString("pt-BR");
    numerosDeConexoes = data.dependencies.database.max_connections;
    numerosDeConexoesAbertas = data.dependencies.database.opened_connections;
    versaoNode = data.dependencies.database.version;
  }

  return (
    <div>
      Ultima atualização:{updateAltText}
      <p> Numeros de conexões maxímas permitidas : {numerosDeConexoes} </p>
      <p> Numeros de conexões abertas : {numerosDeConexoesAbertas}</p>
      <p>Versão do servidor: {versaoNode}</p>
    </div>
  );
}
