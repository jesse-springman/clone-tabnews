test("api/v1/status should 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");

  expect(response.status).toBe(200);

  const responseBody = await response.json();

  const dateParsed = new Date(responseBody.uptade_alt).toISOString();

  expect(dateParsed).toEqual(responseBody.uptade_alt);

  expect(responseBody.dependencies.database.max_connections).toBeDefined();

  expect(responseBody.dependencies.database.opened_connections).toBeDefined();

  expect(responseBody.dependencies.database.version).toBe("16.6");

  console.log(responseBody);
});

test("test query parametres dinamic", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
});
