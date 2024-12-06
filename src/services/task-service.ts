import { PrismaClient } from '@prisma/client';
import { ITask } from '../models/task/task-model';
import { taskRepository } from '../repositories';

const prisma = new PrismaClient();

/**
 * Create a task
 * @param {string} title
 * @param {string} description
 * @param {string} createdUser
 * @returns {Promise<ITask>}
 */
const createTask = async (
  title: string,
  description: string,
  userId: string
): Promise<ITask> => {
  const taskEntity = {
    title,
    description,
    userId: parseInt(userId),
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const createdTask = await taskRepository.create(taskEntity);
  return createdTask;
};

/**
 * Get a task by its title
 * @param {string} userId
 * @param {string} title
 * @returns {Promise<ITask | null>}
 */
const getTaskByTitle = async (userId: string, title: string): Promise<ITask | null> => {
  return await taskRepository.getTaskSingle(userId, title);
};

/**
 * Update a task
 * @param {String} taskId
 * @param {Partial<ITask>} updatedFields
 * @returns {Promise<ITask | null>}
 */
const updateTask = async (
  taskId: string,
  updatedFields: Partial<ITask>
): Promise<ITask | null> => {
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
 * Update a task's rank
 * @param {string} taskId - The ID of the task to update
 * @param {number} rank - The new rank
 * @returns {Promise<ITask | null>} - The updated task or null if not found
 */
const updateRank = async (
  taskId: string,
  rank: number
): Promise<ITask | null> => {
  const updatedTask = await taskRepository.updateRank(taskId, rank);
  return updatedTask;
};

export default {
  createTask,
  getTaskByTitle,
  updateTask,
  deleteTask,
  getAllTasks,
  updateRank,
};
