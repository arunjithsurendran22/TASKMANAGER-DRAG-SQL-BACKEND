import { PrismaClient } from '@prisma/client';
import { IUser } from '../models/user/user-model';
import UserEntity from '../entities/auth-entity';

const prisma = new PrismaClient();

/**
 * Add new user entry to the database
 * @param {UserEntity} userEntity
 * @returns {Promise<IUser>}
 */
const createNewUser = async (userEntity: UserEntity): Promise<IUser> => {
  try {
    const userData = await prisma.user.create({
      data: {
        name: userEntity.name,
        email: userEntity.email,
        password: userEntity.password,
        documentStatus: userEntity.documentStatus,
        createdUserId: userEntity.createdUserId,
        updatedUserId: userEntity.updatedUserId,
        createdAt: userEntity.createdAt,
        updatedAt: userEntity.updatedAt,
      },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
        documentStatus: true,
        createdUserId: true,
        createdAt: true,
        updatedUserId: true,
        updatedAt: true
      }
    });
    return userData as IUser;
  } catch (error: any) {
    throw new Error(`Error creating new user: ${(error as Error).message}`);
  }
};

/**
 * Find user entry by email
 * @param {String} email
 * @returns {Promise<IUser | null>}
 */
const loginUser = async (email: string): Promise<IUser | null> => {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
        documentStatus: true,
        createdUserId: true,
        createdAt: true,
        updatedUserId: true,
        updatedAt: true
      }
    });
    return user as IUser | null;
  } catch (error: any) {
    throw new Error(`Error finding user: ${(error as Error).message}`);
  }
};

/**
 * Find user by email
 * @param {String} email
 * @returns {Promise<IUser | null>}
 */
const findUserByEmail = async (email: string): Promise<IUser | null> => {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
        documentStatus: true,
        createdUserId: true,
        createdAt: true,
        updatedUserId: true,
        updatedAt: true
      }
    });
    return user as IUser | null;
  } catch (error: any) {
    throw new Error(`Error finding user by email: ${(error as Error).message}`);
  }
};

export default {
  createNewUser,
  loginUser,
  findUserByEmail,
};
