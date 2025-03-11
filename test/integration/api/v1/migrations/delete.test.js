test("DELETE api/v1/migrations delete ", async () => {
  const response = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "DELETE",
  });

  expect(response.status).toBe(204);
});
