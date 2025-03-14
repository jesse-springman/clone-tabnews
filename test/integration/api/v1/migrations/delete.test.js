test("DELETE page", async () => {
  const response = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "DELETE",
  });

  const responseBody = await response.json();
  console.log(responseBody);

  expect(responseBody.message).toBe("ERRO");
});
