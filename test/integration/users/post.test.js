import orchestrator from "test/orchestrator";
import database from "infra/database";

beforeAll(async () => {
  await orchestrator.waitAllServices();
  await orchestrator.databaseClean();
  await orchestrator.runPendingMigrations();
});

describe("POST api/v1/users",  () => {
  test("With unique and valid data", async () => {

    await database.query({
      text: "INSERT INTO users (username, email, password) VALUES ($1, $2, $3);",
      values: ["jesseSpringman", "jesseTeste@gmail.com", "senha123"]
    });

    let usersData = await database.query("SELECT * FROM users;")
    
     console.log(usersData.rows);

    const response = await fetch("http://localhost:3000/api/v1/users", {
        method: "POST"
      });

      expect(response.status).toBe(201);


     

    });
 
});
