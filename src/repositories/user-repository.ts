import { IUser } from '../models/user/user-model';
import UserEntity from '../entities/user-entity';
import USER from '../models/user/user';
import { Types } from 'mongoose';

/*----------------------------------------------------------------------------------*/
/**
 * Add new user entry to database
 * @param {UserEntity} userEntity
 * @returns {Promise<IUser>}
 */
const createNewUser = async (userEntity: UserEntity): Promise<IUser> => {
  try {
    const userData = await new USER(userEntity).save();
    return userData;
  } catch (error: any) {
    throw new Error(`Error creating new user: ${(error as Error).message}`);
  }
};
/*----------------------------------------------------------------------------------*/
/**
 * Find user entry by matching country code and phone number
 * @param {String} countryCode
 * @param {String} mobileNumber
 * @returns {Promise<IUser | null>}
 */
const loginUser = async (countryCode: string, mobileNumber: string): Promise<IUser | null> => {
  try {
    const userData: IUser | null = await USER.findOne({ countryCode, mobileNumber, documentStatus: true });
    return userData;
  } catch (error: any) {
    throw new Error(`Error finding user: ${(error as Error).message}`);
  }
};
/*----------------------------------------------------------------------------------*/
/**
 * Update user data by userId
 * @param {string} userId
 * @param {any} updateData
 * @returns {Promise<IUser | null>}
 */
const updateUserProfile = async (userId: string, updateData: any): Promise<IUser | null> => {
  try {
    const updatedUserData: IUser | null = await USER.findByIdAndUpdate(userId, updateData, { new: true });
    return updatedUserData;
  } catch (error: any) {
    throw new Error(`Error updating user data: ${(error as Error).message}`);
  }
};

/*----------------------------------------------------------------------------------*/
/**
 * delete user data by userId
 * @param {string} userId
 * @returns {Promise<IUser | null>}
 */
const deleteUserProfile = async (userId: string): Promise<IUser | null> => {
  try {
    if (!userId) {
      throw new Error('User ID missing!');
    }
    const deletedUserProfile: IUser | null = await USER.findByIdAndUpdate(userId, { documentStatus: false }, { new: true });
    if (!deletedUserProfile) {
      throw new Error('User not found!');
    }
    return deletedUserProfile;
  } catch (error: any) {
    throw new Error(`Error updating user data: ${error.message}`);
  }
};
/*----------------------------------------------------------------------------------*/
/**
 * Save fcm token in user document
 * @param {String} userId
 * @param {String} fcmToken
 */
const addFCMToken = async (userId: string, fcmToken: string) => {
  try {
    await USER.findByIdAndUpdate(userId, { $addToSet: { fcmTokens: fcmToken } });
  } catch (error: any) {
    throw new Error(`Error adding FCM token: ${(error as Error).message}`);
  }
};
/*----------------------------------------------------------------------------------*/
/**
 * Find a user by id
 * @param {String} id
 * @returns {Promise<IUser | null>}
 */
const findUserById = async (id: Types.ObjectId): Promise<IUser | null> => {
  try {
    console.log('Finding user by id:', id);
    const userData: IUser | null = await USER.findOne({ _id: id, documentStatus: true });
    return userData;
  } catch (error: any) {
    throw new Error(`Error finding user by id: ${(error as Error).message}`);
  }
};
/*----------------------------------------------------------------------------------*/
/**
 * Get profiles count
 * @param {string} searchTag
 * @param {string} isVerified
 * @returns {Promise<number>}
 */
const getProfilesCount = async (searchTag: string, isVerified: string): Promise<number> => {
  try {
    console.log('Fetching profiles count with searchTag:', searchTag, 'and isVerified:', isVerified);
    const findQuery: any = {
      documentStatus: true,
    };

    if (isVerified === 'true') {
      findQuery.isVerified = true;
    } else if (isVerified === 'false') {
      findQuery.isVerified = false;
    }

    if (searchTag) {
      const searchQuery = {
        $or: [
          { userName: { $regex: searchTag, $options: 'i' } },
          { mobileNumber: { $regex: searchTag, $options: 'i' } },
          { email: { $regex: searchTag, $options: 'i' } },
        ],
      };
      Object.assign(findQuery, searchQuery);
    }

    const count = await USER.countDocuments(findQuery);
    return count;
  } catch (error: any) {
    throw new Error(`Error getting profiles count: ${(error as Error).message}`);
  }
};
/*----------------------------------------------------------------------------------*/
/**
 * Get all profiles
 * @param {number} skip
 * @param {number} limit
 * @param {string} searchTag
 * @param {string} isVerified
 * @returns {Promise<IUser[]>}
 */
const getAllProfiles = async (skip: number, limit: number, searchTag: string, isVerified: string): Promise<IUser[]> => {
  try {
    console.log('Fetching profiles with skip:', skip, 'limit:', limit, 'searchTag:', searchTag, 'isVerified:', isVerified);
    const findQuery: any = {
      documentStatus: true,
    };

    if (isVerified === 'true') {
      findQuery.isVerified = true;
    } else if (isVerified === 'false') {
      findQuery.isVerified = false;
    }

    if (searchTag) {
      const searchQuery = {
        $or: [
          { userName: { $regex: searchTag, $options: 'i' } },
          { mobileNumber: { $regex: searchTag, $options: 'i' } },
          { email: { $regex: searchTag, $options: 'i' } },
        ],
      };
      Object.assign(findQuery, searchQuery);
    }

    const profiles = await USER.find(findQuery, '_id name userName profileImageUrl email countryCode mobileNumber isVerified subscriptionAmount')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    return profiles;
  } catch (error: any) {
    throw new Error(`Error getting all profiles: ${(error as Error).message}`);
  }
};
/*----------------------------------------------------------------------------------*/
/**
 * Find user profile by userId
 * @param {string} userId
 * @returns {Promise<IUser | null>}
 */
const findUserProfile = async (userId: string): Promise<IUser | null> => {
  try {
    console.log('Finding user profile for userId:', userId);
    const userProfile: IUser | null = await USER.findOne(
      { _id: new Types.ObjectId(userId), documentStatus: true },
      '_id name email countryCode mobileNumber city dateOfBirth gender idType idNumber profileImageUrl');
    return userProfile;
  } catch (error: any) {
    throw new Error(`Error finding user profile: ${(error as Error).message}`);
  }
};
/*----------------------------------------------------------------------------------*/
export default {
  createNewUser,
  loginUser,
  deleteUserProfile,
  // findUserByUserName,
  addFCMToken,
  findUserById,
  getProfilesCount,
  getAllProfiles,
  findUserProfile,
  updateUserProfile,
};
