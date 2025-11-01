import { version as uuIdVersion } from "uuid"; // Descestruturação ja renomeando o metodo que era "version"  para "uuidVersion"
import orchestrator from "test/orchestrator";
import userModel from "models/user.js";
import password from "models/password.js";
import "dotenv/config";



beforeAll(async () => {
  await orchestrator.waitAllServices();
  await orchestrator.databaseClean();
  await orchestrator.runPendingMigrations();
});



describe("POST api/v1/users", () => {
  test("validation unique data", async () => {
    const response = await fetch("http://localhost:3000/api/v1/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        username: "jesseSpringman",
        email: "jesseTeste1@gmail.com",
        password: "senha123",
      }),
    });

    expect(response.status).toBe(201);

    const resposeBody = await response.json();

    expect(resposeBody).toEqual({
      id: resposeBody.id,
      username: "jesseSpringman",
      email: "jesseTeste1@gmail.com",
      password: resposeBody.password,
      create_at: resposeBody.create_at,
      uptade_at: resposeBody.uptade_at,
    });


    expect(uuIdVersion(resposeBody.id)).toBe(4); //uuIdVersion() pega o valor passado via argumento e valida se é um uuid pela versão que o Postgres usa que é a 4
    expect(Date.parse(resposeBody.create_at)).not.toBeNaN();
    expect(Date.parse(resposeBody.uptade_at)).not.toBeNaN();


    const userInDataBase = await userModel.findOneUser("jesseSpringman");
    const correctPasswordMatch = await password.compare("senha123", userInDataBase.password);
    expect(correctPasswordMatch).toBe(true);

    const wrongPasswordMatch = await password.compare("senhaErrada",userInDataBase.password);
    expect(wrongPasswordMatch).toBe(false);
  });
});

describe("POST /api/v1/users validate email", () => {
  test("validate 'email' duplicat", async () => {
    const response = await fetch("http://localhost:3000/api/v1/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        username: "testEmailDuplicado",
        email: "jesseteste@gmail.com",
        password: "senha123",
      }),
    });

    expect(response.status).toBe(201);

    const response2 = await fetch("http://localhost:3000/api/v1/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        username: "testEmailDuplicado2",
        email: "JesseTeste@gmail.com",
        password: "senha123",
      }),
    });

    expect(response2.status).toBe(400);

    const resposeBody = await response2.json();

    expect(resposeBody).toEqual({
      name: "ValidationError",
      message: "Erro de validação de dados",
      action: "Altere os dados inseridos",
      status_code: 400,
    });
  });
});

describe("POST  validate username", () => {
  test("validate 'username' duplicat", async () => {
    const response = await fetch("http://localhost:3000/api/v1/users", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        username: "jessespringman",
        email: "username@gmail.com",
        password: "senha123",
      }),
    });

    expect(response.status).toBe(400);

    // const responseBody = await response.json()
    // console.log(responseBody);
  });
});
