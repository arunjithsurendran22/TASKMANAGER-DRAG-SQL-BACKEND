import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import ERROR from '../web_server/http-error';

/**
 * @function verifyUser //verify header token and extract user ID
 * @param req
 * @param res
 * @param next
 */
export const verifyUser = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers['authorization']; //"authorization: bearer <Token>" --to--> "bearer <Token>"
    const token = authHeader && authHeader.split(' ')[1]; // "bearer <Token>" --to--> ["bearer", "<Token>"] --to--> "<Token>"

    if (token == null) throw new ERROR.BadRequestError('Authorization Error: Token missing!');
    
    jwt.verify(token, process.env.JWT_SECRET as string, (err: any, user: any) => {
      if (err) throw new ERROR.UnauthorizedError('Authorization Error: Token verification failed!');
      if (!user.id) {
        throw new ERROR.UnauthorizedError('Authorization Error: User ID not found in token!');
      }

      req.body.userId = user.id; // Set userId in request body
      next();
    });
  } catch (e) {
    next(e);
  }
};