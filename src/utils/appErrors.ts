class AppError extends Error {
  public code: number;
  public status: string;
  public isOperational: boolean;

  constructor(message: string, code: number) {
    super(message);

    this.code = code;
    this.status = "error";
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
