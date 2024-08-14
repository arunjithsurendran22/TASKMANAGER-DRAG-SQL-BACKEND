import { Model, Schema, model } from 'mongoose';
import { IUser, Gender, IdType } from './user-model';

// Define the user schema
const userSchema: Schema<IUser> = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  countryCode: { type: String, required: true },
  mobileNumber: { type: String, required: true },
  documentStatus: { type: Boolean, required: true, default: true },
  fcmTokens: [{ type: String }],
  createdUser: { type: Schema.Types.ObjectId, default: null },
  createdAt: { type: Date, default: Date.now },
  updatedUser: { type: Schema.Types.ObjectId, default: null },
  updatedAt: { type: Date, default: Date.now },
});

// Update the `updatedAt` field before saving the document
userSchema.pre<IUser>('save', function (next) {
  this.updatedAt = new Date();
  next();
});

const USER: Model<IUser> = model<IUser>('USERS', userSchema);

export default USER;
