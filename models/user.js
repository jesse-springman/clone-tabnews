import database from "infra/database";
import { ValidationError, NotFound } from "infra/erros";

async function findOneUser(urlUsername) {
  const userFound = await searchUsername(urlUsername);
  return userFound;

  async function searchUsername(urlUsername) {
    const result = await database.query({
      text: "SELECT * FROM users WHERE LOWER(username) = LOWER($1) LIMIT 1 ;", //LIMIT 1 = retorna somente 1, isso ajuda no processamento de dados
      values: [urlUsername],
    });

    if (result.rowCount === 0) {
      throw new NotFound({
        message: "Usuário não encontrado",
        action: "Verifique os dados se estão corretos",
      });
    }

    return result.rows[0];
  }
}

async function createUser(inputValuesUser) {
  await validateUniqueEmail(inputValuesUser.email);

  await ValidetionUniqueUsername(inputValuesUser.username);

  //  await searchUsername(urlUsername)

  const newUser = await insertUser(inputValuesUser);
  return newUser;

  async function insertUser(inputValuesUser) {
    const result = await database.query({
      text: "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *;",
      values: [
        inputValuesUser.username,
        inputValuesUser.email,
        inputValuesUser.password,
      ],
    });

    return result.rows[0];
  }

  async function validateUniqueEmail(email) {
    const result = await database.query({
      text: "SELECT email FROM users WHERE LOWER(email) = LOWER($1);",
      values: [email],
    });

    if (result.rowCount > 0) {
      throw new ValidationError({
        message: "Erro de validação de dados",
        action: "Altere os dados inseridos",
      });
    }
  }

  async function ValidetionUniqueUsername(username) {
    const usernameAtBank = await database.query({
      text: "SELECT username FROM users WHERE LOWER(username) = LOWER($1);",
      values: [username],
    });

    if (usernameAtBank.rowCount > 0) {
      throw new ValidationError({
        mensage: "UsernameExistente",
        action: "Username existente, altere por favor",
      });
    }
  }
}

const userModel = {
  createUser,
  findOneUser,
};

export default userModel;
