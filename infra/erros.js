export class InternalServerError extends Error {
  constructor({ cause, statusCode }) {
    super("Um erro interno não esparado aconteceu", {
      cause,
    });

    (this.name = "InternalServerError"),
      (this.action = "Entre em contato com o suporte"),
      (this.statusCode = statusCode || 500);
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      action: this.action,
      status_code: this.statusCode,
    };
  }
}

export class ServicesError extends Error {
  constructor({ messagee, cause }) {
    super(messagee || "Um erro no banco de dados não esparado aconteceu", {
      cause,
    });

    (this.name = "ServiceError"),
      (this.action = "Entre em contato com o suporte"),
      (this.statusCode = 503); // 503 = Service not available
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      action: this.action,
      status_code: this.statusCode,
    };
  }
}


export class ValidationError extends Error {
  constructor({ message, action }) {
    super(message || "Erro na validação de dados", {
      message,
      action
    });

    (this.name = "ValidationError"),
      (this.action = "Altere os dados inseridos"),
      (this.statusCode = 400);
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      action: this.action,
      status_code: this.statusCode,
    };
  }
}


export class MethodNoAllowedError extends Error {
  constructor() {
    super("Esse método não é válido para esse endpoint");

    (this.name = "MethodNotAllowedError"),
      (this.action =
        "Verifique quais métodos HTTP são válidos para esse endoint"),
      (this.statusCode = 405);
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      action: this.action,
      status_code: this.statusCode,
    };
  }
}
