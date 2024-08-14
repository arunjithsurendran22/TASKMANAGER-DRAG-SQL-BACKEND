import { Types } from "mongoose";

class TaskEntity {
  public _id: Types.ObjectId;
  public name: string;
  public status: "pending" | "completed" | "in-progress";
  public createdUser: Types.ObjectId | null;
  public createdAt: Date | null;
  public updatedUser: Types.ObjectId | null;
  public updatedAt: Date | null;
  public documentStatus: boolean;

  constructor(
    _id: Types.ObjectId,
    name: string,
    status: "pending" | "completed" | "in-progress" ,
    createdUser: Types.ObjectId | null,
    createdAt: Date | null,
    updatedUser: Types.ObjectId | null,
    updatedAt: Date | null,
    documentStatus: boolean
  ) {
    this._id = _id;
    this.name = name;
    this.status = status;
    this.createdUser = createdUser;
    this.createdAt = createdAt;
    this.updatedUser = updatedUser;
    this.updatedAt = updatedAt;
    this.documentStatus = documentStatus;
  }
}

export default TaskEntity;
