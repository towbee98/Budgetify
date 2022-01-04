class AppError extends Error {
  constructor(message, statusCode) {
    super(message); //This is used to call the parent constructor

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;
    //err.stack will basically show us where the error happened
    Error.captureStackTrace(this, this.constructor);
  }
}
module.exports = AppError;
