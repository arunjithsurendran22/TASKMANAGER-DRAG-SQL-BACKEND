import { authRepository } from '../repositories';
import { IUser } from '../models/user/user-model';
import ERROR from '../middlewares/web_server/http-error';
import argon2 from 'argon2';
import tokenService from './token-service'; // For generating tokens

/**
 * Handle user authentication (login).
 * @param { any } obj
 */
const authUser = async (obj: { email: string, password: string }) => {
  const findUser: IUser | null = await authRepository.loginUser(obj.email);
  
  if (!findUser) {
    throw new ERROR.NotFoundError('User not found!');
  }

  // Verify password using argon2
  const isPasswordValid = await argon2.verify(findUser.password, obj.password);
  if (!isPasswordValid) {
    throw new ERROR.UnauthorizedError('Invalid credentials!');
  }

  return findUser;
};

/**
 * Generate authentication token (access token)
 * @param { IUser } userData
 * @returns { Promise<string> }
 */
const generateAuthToken = async (userData: IUser): Promise<string> => {
  const accessToken = await tokenService.generateAccessToken(userData);
  return accessToken;
};

/**
 * Register a new user
 * @param { { email: string, password: string, name: string } } userData
 * @returns { Promise<IUser> }
 */
const createUser = async (userData: { email: string, password: string, name: string }) => {
  const existingUser = await authRepository.findUserByEmail(userData.email);

  if (existingUser) {
    throw new ERROR.BadRequestError('User already exists with this email!');
  }

  // Hash password using argon2
  const hashedPassword = await argon2.hash(userData.password);

  // Create and save the new user
  const newUser: IUser = await authRepository.createNewUser({
    id: 0,
    name: userData.name,
    email: userData.email,
    password: hashedPassword,
    documentStatus: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    createdUserId: null,
    updatedUserId: null
  });

  return newUser;
};

export default {
  authUser,
  generateAuthToken,
  createUser,
};
