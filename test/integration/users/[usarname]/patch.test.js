import { version as uuIdVersion } from "uuid"; // Descestruturação ja renomeando o metodo que era "version"  para "uuidVersion"
import orchestrator from "test/orchestrator";

beforeAll(async () => {
  await orchestrator.waitAllServices();
  await orchestrator.databaseClean();
  await orchestrator.runPendingMigrations();
});

describe("PATCH api/v1/users/[usarname]", () => {
  test("user not found", async () => {
    const response = await fetch(
      "http://localhost:3000/api/v1/users/usarioNaoExistee", {
      method: "PATCH"
    }
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


  test("username Duplicated", async () => {
    const user1 = await fetch("http://localhost:3000/api/v1/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        username: "testPACTH1",
        email: "testPACTH1@gmail.com",
        password: "senha123",
      }),
    });

    expect(user1.status).toBe(201);


    const user2 = await fetch("http://localhost:3000/api/v1/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        username: "testPACTH2",
        email: "testPACTH2@gmail.com",
        password: "senha123",
      }),
    });

    expect(user2.status).toBe(201);



    const responseAttUser = await fetch("http://localhost:3000/api/v1/users/testPACTH1", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        username: 'testPACTH2'
      })
    })

    expect(responseAttUser.status).toBe(400);

    const responseBodyUserAtt = await responseAttUser.json();

    expect(responseBodyUserAtt).toEqual({
      name: "ValidationError",
      message: "Erro na validação de dados",
      action: "Altere os dados inseridos",
      status_code: 400,
    });
  });




  test("Email   Duplicated", async () => {
    const user1 = await fetch("http://localhost:3000/api/v1/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        username: "emailPATCH1",
        email: "emailPATCH@gmail.com",
        password: "senha123",
      }),
    });

    expect(user1.status).toBe(201);


    const user2 = await fetch("http://localhost:3000/api/v1/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        username: "emailPATCH2",
        email: "emailPATCH2@gmail.com",
        password: "senha123",
      }),
    });

    expect(user2.status).toBe(201);



    const responseAttUserEmail = await fetch("http://localhost:3000/api/v1/users/emailPATCH2", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        email: 'emailPATCH@gmail.com'
      })
    })

    expect(responseAttUserEmail.status).toBe(400);

    const responseBodyUserAtt = await responseAttUserEmail.json();

    expect(responseBodyUserAtt).toEqual({
      name: "ValidationError",
      message: "Erro de validação de dados",
      action: "Altere os dados inseridos",
      status_code: 400,
    });
  });



  test("user att data", async () => {
    const user1 = await fetch("http://localhost:3000/api/v1/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        username: "patchCorrect",
        email: "patchCorrect@gmail.com",
        password: "senha123",
      }),
    });

    expect(user1.status).toBe(201);


    const responsePatch = await fetch("http://localhost:3000/api/v1/users/patchCorrect", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        username: "userAtt"
      })
    })

    expect(responsePatch.status).toBe(200);

    const responseBodyUserAtt =  await responsePatch.json();

    expect(responseBodyUserAtt).toEqual({
      id: responseBodyUserAtt.id,
      username: "userAtt",
      email: "patchCorrect@gmail.com",
      password: responseBodyUserAtt.password,
      create_at: responseBodyUserAtt.create_at,
      updated_at: responseBodyUserAtt.updated_at,
    });


    expect(uuIdVersion(responseBodyUserAtt.id)).toBe(4); //uuIdVersion() pega o valor passado via argumento e valida se é um uuid pela versão que o Postgres usa que é a 4
    expect(Date.parse(responseBodyUserAtt.create_at)).not.toBeNaN();
    expect(Date.parse(responseBodyUserAtt.updated_at)).not.toBeNaN();


});
















  // test("Case diferente dando match", async () => {
  //   const response = await fetch("http://localhost:3000/api/v1/users", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },

  //     body: JSON.stringify({
  //       username: "testCaseDiferente",
  //       email: "TesteCase@gmail.com",
  //       password: "senha123",
  //     }),
  //   });

  //   expect(response.status).toBe(201);

  //   const response2 = await fetch(
  //     "http://localhost:3000/api/v1/users/testcasediferente",
  //   );

  //   expect(response2.status).toBe(200);

  //   const resposeBody2 = await response2.json();

  //   expect(resposeBody2).toEqual({
  //     id: resposeBody2.id,
  //     username: "testCaseDiferente",
  //     email: "TesteCase@gmail.com",
  //     password: resposeBody2.password,
  //     create_at: resposeBody2.create_at,
  //     uptade_at: resposeBody2.uptade_at,
  //   });

  //   expect(uuIdVersion(resposeBody2.id)).toBe(4); //uuIdVersion() pega o valor passado via argumento e valida se é um uuid pela versão que o Postgres usa que é a 4
  //   expect(Date.parse(resposeBody2.create_at)).not.toBeNaN();
  //   expect(Date.parse(resposeBody2.uptade_at)).not.toBeNaN();
  // });


});
