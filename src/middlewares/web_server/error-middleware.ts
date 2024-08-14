import { Request, Response, NextFunction } from 'express';

const errorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.log('Error Middleware:::::::::', err);
  const statusCode = err.statusCode || 500;
  const status = false;
  const message = err['message'] || 'Internal Server Error';
  res.status(err.statusCode != 500 ? 200 : 500).json({ status, statusCode, message });
};

export default errorMiddleware;
