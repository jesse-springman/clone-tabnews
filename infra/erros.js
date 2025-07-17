export class InternalServerError extends Error {
  constructor({ cause }) {
    super("Um erro interno não esparado aconteceu", {
      cause,
    });

    (this.name = "InternalServerError"),
      (this.action = "Entre em contato com o suporte"),
      (this.statusCode = 500);
  }

  toJSON() {
    //oque vai aparecer quando o obj InternalServerError foi tranformado em JSON
    return {
      name: this.name,
      message: this.message, //menagem do parametro do super()
      action: this.action,
      status_code: this.statusCode,
    };
  }
}
