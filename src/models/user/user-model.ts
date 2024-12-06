import { Document, Types } from 'mongoose';

export interface IUser {
  id: number;
  email: string;
  name: string;
  password: string;
  documentStatus: boolean;
  createdUserId: number | null;
  createdAt: Date;
  updatedUserId: number | null;
  updatedAt: Date;
}
