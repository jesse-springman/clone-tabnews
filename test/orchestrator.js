import retry from "async-retry";

async function waitAllServices() {
  await waitForWebServer();

  async function waitForWebServer() {
    await retry(fetchPageStatus, {
      retries: 100,
      maxTimeout: 1000,
    });

    async function fetchPageStatus() {
      const response = await fetch("http://localhost:3000/api/v1/statu");

      if (response.status !== 200) {
        throw error;
      }
    }
  }
}

export default {
  waitAllServices,
};
