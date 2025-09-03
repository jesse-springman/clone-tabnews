import database from "infra/database";
import { ValidationError, ValidationUserNameError } from "infra/erros";

async function createUser(inputValuesUser) {

  await validateUniqueEmail(inputValuesUser.email);

  await ValidetionUniqueUsername(inputValuesUser.username)


  const newUser = await insertUser(inputValuesUser);
  return newUser;



  async function insertUser(inputValuesUser) {
    const result = await database.query({

      text: "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *;",
      values: [inputValuesUser.username, inputValuesUser.email, inputValuesUser.password]
    });

    return result.rows[0];
  }


  async function validateUniqueEmail(email) {

    const result = await database.query({

      text: "SELECT email FROM users WHERE LOWER(email) = LOWER($1);",
      values: [email]
    });

    if (result.rowCount > 0) {
      throw new ValidationUserNameError({
        message: "Erro de validação de dados",
        action: "Altere os dados inseridos"
      })
    }
  }
}


async function ValidetionUniqueUsername(username) {

  const usernameAtBank = await database.query({
    text: "SELECT username FROM users WHERE LOWER(username) = LOWER($1);",
    values: [username]
  })

  if (usernameAtBank.rowCount > 0) {
    throw new ValidationError({
      mensage: "UsernameExistente",
      action: "Username existente, altere por favor"
    })
  }
}


const userModel = {
  createUser
}

export default userModel