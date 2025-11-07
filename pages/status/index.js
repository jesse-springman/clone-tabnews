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
      <AllData />
    </>
  );
}

function UpdateAlt() {
  const { data, isLoading } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  let updateAltText = "Carregando";

  if (!isLoading && data) {
    updateAltText = new Date(data.updated_alt).toLocaleString("pt-BR");
  }

  return (
    <>
      <h2>Ultima atualização :{updateAltText}</h2>
    </>
  );
}

function AllData() {
  const { data, isLoading } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  let numerosDeConexoes = "Carregando...";
  let numerosDeConexoesAbertas = "Carregando...";
  let versaoNode = "Carregando...";

  if (!isLoading && data) {
    numerosDeConexoes = data.dependencies.database.max_connections;
    numerosDeConexoesAbertas = data.dependencies.database.opened_connections;
    versaoNode = data.dependencies.database.version;
  }

  return (
    <div>
      <h2>DataBase</h2>
      <p> Numeros de conexões maxímas permitidas : {numerosDeConexoes} </p>
      <p> Numeros de conexões abertas : {numerosDeConexoesAbertas}</p>
      <p>Versão do servidor: {versaoNode}</p>
    </div>
  );
}
