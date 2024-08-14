import { Document, Types } from "mongoose";

export interface ITask extends Document {
  _id: Types.ObjectId;
  name: string;
  status: "pending" | "completed" | "in-progress";
  createdUser: Types.ObjectId | null;
  createdAt: Date | null;
  updatedUser: Types.ObjectId | null;
  updatedAt: Date | null;
  documentStatus: boolean;
  userId: string;
 
}
