import jwt from 'jsonwebtoken';
import { IUser } from '../models/user/user-model';

/**
 * Generate access token
 * @param { IUser } userData
 * @returns { Promise<string> }
 */
const generateAccessToken = (userData: IUser): string => {
  const payload = { id: userData.id, email: userData.email };
  const accessToken = jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: '1h' });
  return accessToken;
};

export default {
  generateAccessToken,
};
