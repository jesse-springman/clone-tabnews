import retry from "async-retry";
import database from "infra/database";

async function waitAllServices() {
  await waitForWebServer();

  async function waitForWebServer() {
    await retry(fetchPageStatus, {
      retries: 100,
      maxTimeout: 1000,
    });

    async function fetchPageStatus() {
      const response = await fetch("http://localhost:3000/api/v1/status");

      if (response.status !== 200) {
        throw Error;
      }
    }
  }
}

async function databaseClean() {
  await database.query("drop schema public cascade; create schema public");
}

const orchestrator = {
  waitAllServices,
  databaseClean,
};

export default orchestrator;
