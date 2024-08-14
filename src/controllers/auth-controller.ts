import { Request, Response, NextFunction } from 'express';
import { IUser } from '../models/user/user-model';
import ApiResponse from '../utils/api-response';
import { authService, tokenService, fcmTokenService } from '../services';

/*----------------------------------------------------------------------------------*/
/**
 * Authenticate user (login or signup)
 * @param { Request } req
 * @param { Response } res
 * @param { NextFunction } next
 */
const authenticateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
   
    const obj = req.body;
    let fcmToken: string = '';
    if (req.headers['fcm-token']) fcmToken = req.headers['fcm-token'] as string;
    
    // Authenticate user
    const userData: IUser = await authService.authUser(obj);
    
    // Generate token
    const tokenData = await tokenService.generateAuthTokens(userData);
    
    // Save FCM token
    if (fcmToken) fcmTokenService.saveFCMToken(userData._id.toString(), fcmToken);
    
    // Send response
    const apiResponse: ApiResponse<{ user: IUser; tokens: any }> = new ApiResponse<{ user: IUser; tokens: any }>();
    apiResponse.message = 'Success!';
    apiResponse.data = { user: userData, tokens: tokenData };
    apiResponse.statusCode = 200;
    res.json(apiResponse);
  } catch (e) {
    next(e);
  }
};
/*----------------------------------------------------------------------------------*/
/**
 * Log out user
 * @param { Request } req
 * @param { Response } res
 * @param { NextFunction } next
 */
const logOutUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await authService.logOut(req.body.refreshToken);
    const apiResponse: ApiResponse<{}> = new ApiResponse<{}>();
    apiResponse.message = 'Success!';
    apiResponse.data = {};
    apiResponse.statusCode = 200;
    res.json(apiResponse);
  } catch (e) {
    next(e);
  }
};
/*----------------------------------------------------------------------------------*/
/**
 * Refresh token
 * @param req
 * @param res
 * @param next
 */
const refreshTokens = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const tokens = await authService.refreshToken(req.body.refreshToken);
    const apiResponse: ApiResponse<{ tokens: any }> = new ApiResponse<{ tokens: any }>();
    apiResponse.message = 'Success!';
    apiResponse.data = { tokens: tokens };
    apiResponse.statusCode = 200;
    res.json(apiResponse);
  } catch (e) {
    next(e);
  }
};
/*----------------------------------------------------------------------------------*/
export default {
  authenticateUser,
  logOutUser,
  refreshTokens,
};
