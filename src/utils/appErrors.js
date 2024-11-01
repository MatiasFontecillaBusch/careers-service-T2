class AppError extends Error {
  constructor(message, code) {
    super(message);

    this.code = code;
    this.status = 'error';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
