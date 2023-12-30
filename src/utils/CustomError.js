export default class CustomError extends Error {
  constructor(
    message = "Internal Server Error!",
    statusCode = 500,
    validationError = null
  ) {
    super(message);
    this.statusCode = statusCode;
    this.validationError = validationError;
  }
}
