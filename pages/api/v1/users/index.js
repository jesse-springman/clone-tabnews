import { createRouter } from "next-connect";
import controllerHandler from "infra/controller";
import userModel from "models/user"; 
 
const router = createRouter();
router.post(postUsers);

export default router.handler(controllerHandler.errorsHandlers);


async function postUsers(request, response) {

  const inputValuesUser = request.body

 const userCreated = await userModel.createUser(inputValuesUser)

  return response.status(201).json(userCreated);
  
  
}
