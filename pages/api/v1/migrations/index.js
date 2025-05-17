import migrationRunner from "node-pg-migrate";
import { resolve } from "node:path";
import database from "infra/database";

export default async function migrations(request, response) {
  const allowedmethods = ["GET", "POST"];
  if (!allowedmethods.includes(request.method)) {
    return response.status(405).json({
      Erro: `ERROR ${request.method} not allowed methods`,
    });
  }

  let dbClient;

  dbClient = await database.getNewClient(); //retorna um client conectado

  try {
    const defalutMigrations = {
      dbClient,
      dryRun: true,
      dir: resolve("infra", "migrations"),
      direction: "up",
      verbose: true,
      migrationsTable: "pgmigrations",
    };

    if (request.method === "GET") {
      const migrationPending = await migrationRunner(defalutMigrations);

      return response.status(200).json(migrationPending);
    }

    if (request.method === "POST") {
      const migrationImplementada = await migrationRunner({
        ...defalutMigrations,
        dryRun: false,
      });

      if (migrationImplementada.length > 0) {
        return response.status(201).json(migrationImplementada);
      }

      return response.status(200).json(migrationImplementada);
    }
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    await dbClient.end();
  }
}
