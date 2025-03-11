import migrationRunner from "node-pg-migrate";
import { join } from "node:path";
import database from "infra/database";

export default async function migrations(request, response) {
  const dbClient = await database.getNewClient(); //retorna um client conectado

  const defalutMigrations = {
    dbClient: dbClient,
    dryRun: true,
    dir: join("infra", "migrations"),
    direction: "up",
    verbose: true,
  };

  if (request.method === "DELETE") {
    const migrationDELETE = await migrationRunner(defalutMigrations);

    return response.status(201).json(migrationDELETE);
  }

  if (request.method === "GET") {
    const migrationPending = await migrationRunner(defalutMigrations);

    await dbClient.end();

    return response.status(200).json(migrationPending);
  }

  if (request.method === "POST") {
    const migrationImplementada = await migrationRunner({
      ...defalutMigrations,
      dryRun: false,
    });

    await dbClient.end();

    if (migrationImplementada.length > 0) {
      return response.status(201).json(migrationImplementada);
    }

    return response.status(200).json(migrationImplementada);
  }
}
