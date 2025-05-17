import orchestrator from "test/orchestrator";

beforeAll(async () => {
  await orchestrator.waitAllServices();
});

describe("GET api/v1/status", () => {
  describe("Anonymuos User", () => {
    test("Retrieving current system status", async () => {
      const response = await fetch("http://localhost:3000/api/v1/status");

      expect(response.status).toBe(200);

      const responseBody = await response.json();

      const dateParsed = new Date(responseBody.uptade_alt).toISOString();

      expect(dateParsed).toEqual(responseBody.uptade_alt);

      expect(responseBody.dependencies.database.max_connections).toBeDefined();

      expect(
        responseBody.dependencies.database.opened_connections,
      ).toBeDefined();

      expect(responseBody.dependencies.database.version).toBe("16.6");
    });
  });
});
