import databaseDev from "infra/database.js";

async function status(request, response) {
  const uptadeAlt = new Date().toISOString();

  const dataMaxConnect = await databaseDev.query("SHOW max_connections;");

  let max_connections = parseInt(dataMaxConnect.rows[0].max_connections);

  const databaseName = process.env.POSTGRES_DB;

  const dataOpenConnect = await databaseDev.query({
    text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;",
    values: [databaseName],
  });

  let opened_connections = dataOpenConnect.rows[0].count;

  console.log(opened_connections);

  const dataVersionPostgres = await databaseDev.query("SHOW server_version;");

  const version = dataVersionPostgres.rows[0].server_version;

  response.status(200).json({
    uptade_alt: uptadeAlt,
    dependencies: {
      database: {
        max_connections,
        opened_connections,
        version,
      },
    },
  });
}

export default status;
