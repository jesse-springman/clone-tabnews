import { createRouter } from "next-connect";
import controllerHandler from "infra/controller";
import userModel from "models/user";

const router = createRouter();
router.get(getUsarname);
router.patch(patchUser);

export default router.handler(controllerHandler.errorsHandlers);

async function getUsarname(request, response) {
  const urlUsername = request.query.username;

  const userFound = await userModel.findOneUser(urlUsername);

  return response.status(200).json(userFound);
}

async function patchUser(request, response) {
  const username = request.query.username;
  const inputValuesUser = request.body;

  const updatedUser = await userModel.update(username, inputValuesUser);

  return response.json(updatedUser);
}
