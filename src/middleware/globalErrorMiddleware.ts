import { Request, Response, NextFunction } from "express";
import AppError from "@/utils/appErrors";

const handleDuplicateFields = (err: any): AppError => {
  
  const message = `Campo duplicado valor. Utilize otro valor`;
  return new AppError(message, 400);
};

const handleValidationError = (err: any): AppError => {
  const message = `Datos ingresados inválidos. ${err.message || ""}`;
  return new AppError(message, 400);
};

const sendErrorDev = (err: AppError, req: Request, res: Response): void => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    msg: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err: AppError, req: Request, res: Response): void => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      msg: err.message,
    });
  } else {
    res.status(500).json({
      status: "error",
      msg: "Algo salio mal!",
    });
  }
};

export default (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, req, res);
  } else if (process.env.NODE_ENV === "production") {
    let error = { ...err };
    error.message = err.message;

    if (error.code === "DUPLICATE_FIELD") error = handleDuplicateFields(error);
    if (error.statusCode === 500 && !err.isOperational) {
      error = handleValidationError(error);
    }
    sendErrorProd(error, req, res);
  }
};
