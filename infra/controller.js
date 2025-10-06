import {
  InternalServerError,
  MethodNoAllowedError,
  ValidationError,
  NotFound,
} from "infra/erros";

function onErrorHandler(error, request, response) {
  if (error instanceof ValidationError || error instanceof NotFound) {
    return response.status(error.statusCode).json(error);
  }

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
