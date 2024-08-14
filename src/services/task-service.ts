import { Types } from "mongoose";
import { ITask } from "../models/task/task-model";
import { taskRepository } from "../repositories";
import TaskEntity from "../entities/task-enitity";

/**
 * Create a task
 * @param {string} task
 * @param {string} createdUser
 * @param {"pending" | "completed" | "in-progress"} [status="pending"] // Default parameter
 * @returns {Promise<ITask>}
 */
const createTask = async (
  task: string,
  createdUser: string,
  status: "pending" | "completed" | "in-progress" = "pending" // Default to "pending"
): Promise<ITask> => {
  const taskEntity = new TaskEntity(
    new Types.ObjectId(),
    task,
    status,
    new Types.ObjectId(createdUser),
    new Date(),
    null,
    new Date(),
    true
  );

  const createdTask = await taskRepository.create(taskEntity);
  return createdTask;
};

/**
 * Get a task by its title
 * @param {string} task
 * @returns {Promise<ITask | null>}
 */
const getTaskByTitle = async (task: string): Promise<ITask | null> => {
  const existData = await taskRepository.getTaskSingle({ task });
  return existData;
};

/**
 * Update a task
 * @param {String} taskId
 *  @param {String} userId
 * @param {Partial<TaskEntity>} updatedFields
 * @returns {Promise<ITask>}
 */
const updateTask = async (
  taskId: string,
  updatedFields: Partial<TaskEntity>
): Promise<ITask> => {
  const updatedTask = await taskRepository.update(taskId, updatedFields);
  return updatedTask;
};

/**
 * Delete a task
 * @param {String} userId
 * @param {String} taskId
 * @returns {Promise<void>}
 */
const deleteTask = async (userId: string, taskId: string): Promise<void> => {
  await taskRepository.deleteTask(userId, taskId);
};

/**
 * Fetch all tasks
 * @param {string} userId
 * @param {number} pageNumber
 * @param {number} pageSize
 * @param {string} searchTag
 * @returns {Promise<{ tasks: ITask[]; totalCount: number }>}
 */
const getAllTasks = async (
  userId: string,
  pageNumber: number,
  pageSize: number,
  searchTag: string
): Promise<{ tasks: ITask[]; totalCount: number }> => {
  const skip = (pageNumber - 1) * pageSize;
  const [tasks, totalCount] = await Promise.all([
    taskRepository.getAllTasks(userId, skip, pageSize, searchTag),
    taskRepository.getAllTaskCount(userId, searchTag),
  ]);
  return { tasks, totalCount };
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
  // Ensure newStatus is one of the allowed values
  const validStatuses: Array<"pending" | "completed" | "in-progress"> = ["pending", "completed", "in-progress"];
  if (!validStatuses.includes(newStatus)) {
    throw new Error("Invalid status value");
  }

  const updatedTask = await taskRepository.updateStatus(taskId, newStatus);
  return updatedTask;
};


export default {
  createTask,
  getTaskByTitle,
  updateTask,
  deleteTask,
  getAllTasks,
  updateStatus,
};
