import migrationRunner from "node-pg-migrate";
import { resolve } from "node:path";
import database from "infra/database";

const defalutMigrations = {
  dryRun: true,
  dir: resolve("infra", "migrations"),
  direction: "up",
  log: () => {}, //função vazia para tunelar os "logs" do terminal e para de atrabalhar nos tests
  migrationsTable: "pgmigrations",
};

async function pendingMigrations() {
  let dbClient;

  try {
    dbClient = await database.getNewClient();

    const migrationPending = await migrationRunner({
      ...defalutMigrations,
      dbClient,
    });

    return migrationPending;
  } finally {
    await dbClient?.end();
  }
}

async function runMigrationPending() {
  let dbClient;
  try {
    dbClient = await database.getNewClient();

    const migrationImplementada = await migrationRunner({
      ...defalutMigrations,
      dbClient,
      dryRun: false,
    });

    return migrationImplementada;
  } finally {
    await dbClient?.end();
  }
}

const modelMigration = {
  pendingMigrations,
  runMigrationPending,
};

export default modelMigration;
