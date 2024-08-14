import { Document, Types } from 'mongoose';

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

export enum IdType {
  PAN = 'PAN',
  Aadhaar = 'Aadhaar',
  Driving_License = 'Driving_License',
  Passport = 'Passport',
  Other = 'Other',
}

export interface IUser extends Document {
  _id: Types.ObjectId;
  name: string;
  email: string;
  countryCode: string;
  mobileNumber: string;
  documentStatus: boolean;
  fcmTokens: string[];
  createdUser: Types.ObjectId | null;
  createdAt: Date | null;
  updatedUser: Types.ObjectId | null;
  updatedAt: Date | null;
}
