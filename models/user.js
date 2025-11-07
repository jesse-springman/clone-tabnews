import database from "infra/database";
import { ValidationError, NotFound } from "infra/erros";
import password from "./password.js";

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
  await validetionUniqueUsername(inputValuesUser.username);
  await validateUniqueEmail(inputValuesUser.email);
  await hashPasswordOnObject(inputValuesUser); //att o obj com hash da senha

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
}

async function update(username, inputUser) {
  const user = await findOneUser(username);

  if ("username" in inputUser) {
    await validetionUniqueUsername(inputUser.username);
  }

  if ("email" in inputUser) {
    await validateUniqueEmail(inputUser.email);
  }

  if ("password" in inputUser) {
    await hashPasswordOnObject(inputUser);
  }

  const dataAtt = { ...user, ...inputUser };

  const userAtt = await updateDataUser(dataAtt);

  return userAtt;

  async function updateDataUser(dataAtt) {
    const result = await database.query({
      text: ` UPDATE
              users
            SET
              username = $1,
              email = $2,
              password = $3,
              updated_at = timezone('utc' , now())
            WHERE
              id = $4
            RETURNING * `,

      values: [dataAtt.username, dataAtt.email, dataAtt.password, dataAtt.id],
    });

    return result.rows[0];
  }
}

async function hashPasswordOnObject(inputValuesUser) {
  if (!inputValuesUser.password) throw new Error("Password não fornecida");
  const hashedPassword = await password.hash(inputValuesUser.password);
  inputValuesUser.password = hashedPassword; // substitui a senha original pelo hash antes de salvar no banco

  return inputValuesUser;
}

async function validetionUniqueUsername(username) {
  const usernameInBank = await database.query({
    text: "SELECT username FROM users WHERE LOWER(username) = LOWER($1);",
    values: [username],
  });

  if (usernameInBank.rowCount > 0) {
    throw new ValidationError({
      mensage: "Username Existente",
      action: "Username existente, altere por favor",
    });
  }
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

const userModel = {
  createUser,
  findOneUser,
  update,
};

export default userModel;
