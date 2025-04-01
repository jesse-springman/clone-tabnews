import database from "infra/database";
import orchestrator from "test/orchestrator";

beforeAll(async () => {
  await orchestrator.waitAllServices();
  await database.query("drop schema public cascade; create schema public");
});

test("POST migration pending ", async () => {
  const response = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "POST",
  });

  const responseBody = await response.json();

  expect(response.status).toBe(201);

  //validação para se o body in request é um array
  expect(Array.isArray(responseBody)).toBe(true);

  //migration pendente ocupa posição no array
  expect(responseBody.length).toBeGreaterThan(0);
});

test("POST migration implementada", async () => {
  const response = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "POST",
  });

  expect(response.status).toBe(200);
  const responseBody = await response.json();

  //migration Implementada o array fica vazio
  expect(responseBody.length).toBe(0);

  // console.log(resultData);
});
