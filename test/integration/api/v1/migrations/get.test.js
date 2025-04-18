import database from "infra/database";
import orchestrator from "test/orchestrator";

beforeAll(async () => {
  await orchestrator.waitAllServices();
  await database.query("drop schema public cascade; create schema public");
});

test("GET api/v1/migrations should 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/migrations");

  expect(response.status).toBe(200);

  const responseBody = await response.json();

  expect(Array.isArray(responseBody)).toBe(true);
  expect(responseBody.length).toBeGreaterThan(0);
});
