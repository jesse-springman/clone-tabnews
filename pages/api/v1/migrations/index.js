import { createRouter } from "next-connect";
import controllerHandler from "infra/controller";
import modelMigration from "models/migrator";

const router = createRouter();
router.get(getHandle);
router.post(postHandler);

export default router.handler(controllerHandler.errorsHandlers);


async function getHandle(request, response) {
  const migrationPending = await modelMigration.pendingMigrations()

return response.status(200).json(migrationPending)

}
async function postHandler(request, response) {

  const migrationImplementada = await modelMigration.runMigrationPending()

  if (migrationImplementada.length > 0) {
    return response.status(201).json(migrationImplementada);
  }

  return response.status(200).json(migrationImplementada);
  
}
