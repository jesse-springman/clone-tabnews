test("api/v1/status should 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");

  console.log(response);

  expect(response.status).toBe(200);
});
