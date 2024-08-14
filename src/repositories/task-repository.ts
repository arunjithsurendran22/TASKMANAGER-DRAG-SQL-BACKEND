import TaskEntity from "../entities/task-enitity";
import TASK from "../models/task/task";
import { ITask } from "../models/task/task-model";

/**
 * Create a new task
 * @param {TaskEntity} taskEntity
 * @returns {Promise<ITask>}
 */
const create = async (taskEntity: TaskEntity): Promise<ITask> => {
  const task = new TASK(taskEntity);
  return await task.save();
};

/**
 * Get a single task based on query
 * @param {Object} query
 * @returns {Promise<ITask | null>}
 */
const getTaskSingle = async (query: object): Promise<ITask | null> => {
  return await TASK.findOne(query).exec();
};

/**
 * Update a task
 * @param {String} taskId
 * @param {Partial<TaskEntity>} updatedFields
 * @returns {Promise<ITask>}
 */
const update = async (
  taskId: string,
  updatedFields: Partial<TaskEntity>
): Promise<ITask> => {
  const task = await TASK.findByIdAndUpdate(taskId, updatedFields, {
    new: true,
  }).exec();
  return task as ITask;
};

/**
 * Delete a task
 * @param {String} userId
 * @param {String} taskId
 * @returns {Promise<void>}
 */
const deleteTask = async (userId: string, taskId: string): Promise<void> => {
  await TASK.findByIdAndDelete(taskId).exec();
};

/**
 * Get all tasks with pagination
 * @param {string} userId
 * @param {number} skip
 * @param {number} limit
 * @param {string} searchTag
 * @returns {Promise<ITask[]>}
 */
const getAllTasks = async (
  userId: string,
  skip: number,
  limit: number,
  searchTag: string
): Promise<ITask[]> => {
  const query = {
    createdUser: userId,
    task: new RegExp(searchTag, "i"),
    documentStatus: true,
  };
  return await TASK.find(query).skip(skip).limit(limit).exec();
};

/**
 * Get the count of all tasks based on search
 * @param {string} userId
 * @param {string} searchTag
 * @returns {Promise<number>}
 */
const getAllTaskCount = async (
  userId: string,
  searchTag: string
): Promise<number> => {
  const query = {
    createdUser: userId,
    task: new RegExp(searchTag, "i"),
    documentStatus: true,
  };
  return await TASK.countDocuments(query).exec();
};

/**
 * Update a task's status
 * @param {string} taskId - The ID of the task to update
 * @param {"pending" | "completed" | "in-progress"} newStatus - The new status
 * @returns {Promise<ITask | null>} - The updated task or null if not found
 */
const updateStatus = async (
  taskId: string,
  newStatus: "pending" | "completed" | "in-progress"
): Promise<ITask | null> => {
  const updatedTask = await TASK.findByIdAndUpdate(
    { _id: taskId },
    { status: newStatus, updatedAt: new Date() },
    { new: true } // Return the updated document
  ).exec();
  return updatedTask;
};

export default {
  create,
  getTaskSingle,
  update,
  deleteTask,
  getAllTasks,
  getAllTaskCount,
  updateStatus,
};
