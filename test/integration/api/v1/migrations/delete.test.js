test("DELETE api/v1/migrations should 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "DELETE ",
  });

  expect(response.status).toBe(201);
});
