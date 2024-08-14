import { Schema, model, Model } from "mongoose";
import { ITask } from "./task-model";

const taskSchema: Schema<ITask> = new Schema<ITask>({
  name: { type: String, required: true },
  status: {
    type: String,
    enum: ["pending", "completed", "in-progress"], 
    required: true,
    default: "pending", 
  },
  createdUser: { type: Schema.Types.ObjectId, default: null },
  createdAt: { type: Date, default: Date.now },
  updatedUser: { type: Schema.Types.ObjectId, default: null },
  updatedAt: { type: Date, default: Date.now },
  documentStatus: { type: Boolean, required: true, default: true },
});

// Update the `updatedAt` field before saving the document
taskSchema.pre<ITask>("save", function (next) {
  this.updatedAt = new Date();
  next();
});

const TASK: Model<ITask> = model<ITask>("TASK", taskSchema);

export default TASK;
