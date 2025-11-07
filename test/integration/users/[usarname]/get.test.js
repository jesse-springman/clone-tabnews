import { version as uuIdVersion } from "uuid"; // Descestruturação ja renomeando o metodo que era "version"  para "uuidVersion"
import orchestrator from "test/orchestrator";

beforeAll(async () => {
  await orchestrator.waitAllServices();
  await orchestrator.databaseClean();
  await orchestrator.runPendingMigrations();
});

describe("GET api/v1/users/[usarname]", () => {
  test("insert usaname", async () => {
    const response = await fetch("http://localhost:3000/api/v1/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        username: "testUSERNAME",
        email: "jesseTesteDinamic@gmail.com",
        password: "senha123",
      }),
    });

    expect(response.status).toBe(201);

    const response2 = await fetch(
      "http://localhost:3000/api/v1/users/testUSERNAME",
    );

    expect(response2.status).toBe(200);

    const resposeBody2 = await response2.json();

    expect(resposeBody2).toEqual({
      id: resposeBody2.id,
      username: "testUSERNAME",
      email: "jesseTesteDinamic@gmail.com",
      password: resposeBody2.password,
      create_at: resposeBody2.create_at,
      updated_at: resposeBody2.updated_at,
    });

    expect(uuIdVersion(resposeBody2.id)).toBe(4); //uuIdVersion() pega o valor passado via argumento e valida se é um uuid pela versão que o Postgres usa que é a 4
    expect(Date.parse(resposeBody2.create_at)).not.toBeNaN();
    expect(Date.parse(resposeBody2.updated_at)).not.toBeNaN();
  });

  test("Case diferente dando match", async () => {
    const response = await fetch("http://localhost:3000/api/v1/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        username: "testCaseDiferente",
        email: "TesteCase@gmail.com",
        password: "senha123",
      }),
    });

    expect(response.status).toBe(201);

    const response2 = await fetch(
      "http://localhost:3000/api/v1/users/testcasediferente",
    );

    expect(response2.status).toBe(200);

    const resposeBody2 = await response2.json();

    expect(resposeBody2).toEqual({
      id: resposeBody2.id,
      username: "testCaseDiferente",
      email: "TesteCase@gmail.com",
      password: resposeBody2.password,
      create_at: resposeBody2.create_at,
      updated_at: resposeBody2.updated_at,
    });

    expect(uuIdVersion(resposeBody2.id)).toBe(4); //uuIdVersion() pega o valor passado via argumento e valida se é um uuid pela versão que o Postgres usa que é a 4
    expect(Date.parse(resposeBody2.create_at)).not.toBeNaN();
    expect(Date.parse(resposeBody2.updated_at)).not.toBeNaN();
  });

  test("user not found", async () => {
    const response = await fetch(
      "http://localhost:3000/api/v1/users/usarioNaoExiste",
    );

    expect(response.status).toBe(404);

    const resposeBody = await response.json();

    expect(resposeBody).toEqual({
      name: "NotFound",
      message: "Usuário não encontrado",
      action: "Verifique os dados se estão corretos",
      status_code: 404,
    });
  });
});
