import { createRouter } from "next-connect";
import migrationRunner from "node-pg-migrate";
import { resolve } from "node:path";
import database from "infra/database";
import controllerHandler from "infra/controller";

const router = createRouter();
router.get(getHandle);
router.post(postHandler);

export default router.handler(controllerHandler.errorsHandlers);

const defalutMigrations = {
  dryRun: true,
  dir: resolve("infra", "migrations"),
  direction: "up",
  verbose: true,
  migrationsTable: "pgmigrations",
};

async function getHandle(request, response) {
  let dbClient;

  try {
    dbClient = await database.getNewClient();

    const migrationPending = await migrationRunner({
      ...defalutMigrations,
      dbClient: dbClient,
    });

    return response.status(200).json(migrationPending);
  } catch (err) {
    console.error(err);
  } finally {
    await dbClient.end();
  }
}

async function postHandler(request, response) {
  let dbClient;

  try {
    dbClient = await database.getNewClient();

    const migrationImplementada = await migrationRunner({
      ...defalutMigrations,
      dbClient,
      dryRun: false,
    });

    if (migrationImplementada.length > 0) {
      return response.status(201).json(migrationImplementada);
    }

    return response.status(200).json(migrationImplementada);
  } finally {
    await dbClient.end();
  }
}
