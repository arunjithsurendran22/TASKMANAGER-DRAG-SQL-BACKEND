import UserEntity from '../entities/user-entity';
import config from '../config/config';
import ERROR from '../middlewares/web_server/http-error';
import tokenService from '../services/token-service';
import { userRepository, tokenRepository } from '../repositories';
import { IUser } from '../models/user/user-model';

/*----------------------------------------------------------------------------------*/
/**
 * Handle user authentication.
 * Sign up for new users and login for existing users.
 * @param { any } obj
 */
const authUser = async (obj: any) => {
  const findUser: IUser | null = await userRepository.loginUser(obj.countryCode, obj.mobileNumber);
  if (findUser && findUser._id) {
    // User login
    return findUser;
  } else {
    // User sign-up
    const newUser: IUser = await signUpUser(
      obj.name || "", // Optional name
      obj.countryCode,
      obj.mobileNumber,
      obj.email || "", // Optional email
    );
    return newUser;
  }
};
/*----------------------------------------------------------------------------------*/
/**
 * Logout user
 * @param { string } refreshToken
 */
const logOut = async (refreshToken: string) => {
  await tokenRepository.findTokenAndRemove(refreshToken, config.tokenTypes.REFRESH);
};

/**
 * Refresh access and refresh token
 * @param { String }refreshToken
 */
const refreshToken = async (refreshToken: string) => {
  const tokenData = await tokenRepository.findToken(refreshToken, config.tokenTypes.REFRESH);
  const userData = await userRepository.findUserById(tokenData.user);

  if (!userData) throw new ERROR.NotFoundError('User not found!');

  await tokenRepository.removeToken(tokenData._id);
  return await tokenService.generateAuthTokens(userData);
};
/*----------------------------------------------------------------------------------*/
/**
 * User sign-up
 * @param { string } name
 * @param { string } countryCode
 * @param { string } mobileNumber
 * @param { string } email
 */
const signUpUser = async (
  name: string,
  countryCode: string,
  mobileNumber: string,
  email: string,
) => {
  const userEntity: UserEntity = new UserEntity(
    true, // documentStatus
    name,
    email,
    countryCode,
    mobileNumber,
    [], // fcmTokens
    null, // createdUser
    new Date(), // createdAt
    null, // updatedUser
    new Date(), // updatedAt
  );

  return await userRepository.createNewUser(userEntity);
};

export default {
  authUser,
  logOut,
  refreshToken,
};
