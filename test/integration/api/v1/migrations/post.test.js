import orchestrator from "test/orchestrator";

beforeAll(async () => {
  await orchestrator.waitAllServices();
  await orchestrator.databaseClean();
});

describe("POST to api/v1/migrations", () => {
  describe("Anonymuos User", () => {
    describe("Running pending migrations", () => {
      test("For first time", async () => {
        const response = await fetch(
          "http://localhost:3000/api/v1/migrations",
          {
            method: "POST",
          },
        );

        const responseBody = await response.json();

        expect(response.status).toBe(201);

        //validação para se o body in request é um array
        expect(Array.isArray(responseBody)).toBe(true);

        //migration pendente ocupa posição no array
        expect(responseBody.length).toBeGreaterThan(0);
      });

      test("For second time", async () => {
        const response = await fetch(
          "http://localhost:3000/api/v1/migrations",
          {
            method: "POST",
          },
        );

        expect(response.status).toBe(200);
        const responseBody = await response.json();

        //migration Implementada o array fica vazio
        expect(responseBody.length).toBe(0);

        // console.log(resultData);
      });
    });
  });
});
