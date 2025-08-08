import orchestrator from "test/orchestrator";

beforeAll(async () => {
  await orchestrator.waitAllServices();
});

describe("POST api/v1/status", () => {
  describe("Method Not Allowed", () => {
    test("Retrieving current system status", async () => {
      const response = await fetch("http://localhost:3000/api/v1/status", {
        method: "POST",
      });

      expect(response.status).toBe(405);

      const responseBody = await response.json();

      expect(responseBody).toEqual({
        name: "MethodNotAllowedError",
        message: "Esse método não é válido para esse endpoint",
        action: "Verifique quais métodos HTTP são válidos para esse endoint",
        status_code: 405,
      });
    });
  });
});
