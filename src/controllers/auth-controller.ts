import { Request, Response, NextFunction } from 'express';
import { IUser } from '../models/user/user-model';
import ApiResponse from '../utils/api-response';
import { authService } from '../services';

/**
 * Authenticate user (login)
 * @param { Request } req
 * @param { Response } res
 * @param { NextFunction } next
 */
const authenticateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password } = req.body; // Only email and password for login

    // Authenticate user
    const userData: IUser | null = await authService.authUser({ email, password });

    if (!userData) {
      const apiResponse: ApiResponse<{}> = new ApiResponse<{}>();
      apiResponse.message = 'Invalid email or password!';
      apiResponse.statusCode = 401;
      res.status(401).json(apiResponse);
      return;
    }

    // Generate access token
    const tokenData = await authService.generateAuthToken(userData);

    const apiResponse: ApiResponse<{ user: IUser; token: string }> = new ApiResponse<{ user: IUser; token: string }>();
    apiResponse.message = 'Login successful!';
    apiResponse.data = { user: userData, token: tokenData };
    apiResponse.statusCode = 200;
    res.json(apiResponse);
  } catch (e) {
    next(e);
  }
};

/**
 * Log out user
 * @param { Request } req
 * @param { Response } res
 * @param { NextFunction } next
 */
const logOutUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const apiResponse: ApiResponse<{}> = new ApiResponse<{}>();
    apiResponse.message = 'Logout successful!';
    apiResponse.data = {};
    apiResponse.statusCode = 200;
    res.json(apiResponse);
  } catch (e) {
    next(e);
  }
};

/**
 * Register user
 * @param { Request } req
 * @param { Response } res
 * @param { NextFunction } next
 */
const registerUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password, name } = req.body;  // Only email, password, and name

    // Create a new user
    const newUser: IUser = await authService.createUser({ email, password, name });

    // Generate token for the newly created user
    const tokenData = await authService.generateAuthToken(newUser);

    const apiResponse: ApiResponse<{ user: IUser; token: string }> = new ApiResponse<{ user: IUser; token: string }>();
    apiResponse.message = 'Registration successful!';
    apiResponse.data = { user: newUser, token: tokenData };
    apiResponse.statusCode = 201;
    res.json(apiResponse);
  } catch (e) {
    next(e);
  }
};

export default {
  authenticateUser,
  logOutUser,
  registerUser,
};
