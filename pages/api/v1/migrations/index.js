import { createRouter } from "next-connect";
import controllerHandler from "infra/controller";
import modelMigration from "models/migrator";

const router = createRouter();
router.get(getHandler);
router.post(postHandler);

export default router.handler(controllerHandler.errorsHandlers);

async function getHandler(request, response) {
  const pendingMigrations = await modelMigration.pendingMigrations();

  return response.status(200).json(pendingMigrations);
}

async function postHandler(request, response) {
  const migrationImplementada = await modelMigration.runMigrationPending();

  if (migrationImplementada.length > 0) {
    return response.status(201).json(migrationImplementada);
  }

  return response.status(200).json(migrationImplementada);
}
