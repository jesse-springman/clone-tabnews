import { InternalServerError, MethodNoAllowedError } from "infra/erros";

function onErrorHandler(error, request, response) {
  const publicErrorObject = new InternalServerError({
    statusCode: error.statusCode,
    cause: error,
  });

  console.error(publicErrorObject);
  response.status(publicErrorObject.statusCode).json(publicErrorObject);
}




function onNoMatchHandle(request, response) {
  const publicErrorObject = new MethodNoAllowedError();

  response.status(publicErrorObject.statusCode).json(publicErrorObject);
}

const controllerHandler = {
  errorsHandlers: {
    onError: onErrorHandler,
    onNoMatch: onNoMatchHandle,

  },
};

export default controllerHandler;
