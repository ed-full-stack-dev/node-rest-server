import { NextFunction, Request, Response } from 'express';
import HttpException from '../exeptions/http.exeption';

function errorMiddleware(
  error: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const statusCode = error.status || 500;
  const message = error.message || 'Something went wrong';
  res.status(statusCode).send({
    message,
    statusCode,
  });
}

export default errorMiddleware;
