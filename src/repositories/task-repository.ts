import { PrismaClient } from '@prisma/client';
import { ITask } from '../models/task/task-model';

const prisma = new PrismaClient();

/**
 * Create a task
 * @param {any} taskEntity
 * @returns {Promise<ITask>}
 */
const create = async (taskEntity: any): Promise<ITask> => {
  return await prisma.task.create({
    data: taskEntity,
  });
};

/**
 * Get task by title
 * @param {string} userId
 * @param {string} title
 * @returns {Promise<ITask | null>}
 */
const getTaskSingle = async (
  userId: string,
  title: string
): Promise<ITask | null> => {
  return await prisma.task.findFirst({
    where: {
      userId: parseInt(userId),
      title: title,
      
    },
  });
};

/**
 * Update a task
 * @param {string} taskId
 * @param {Partial<ITask>} updatedFields
 * @returns {Promise<ITask | null>}
 */
const update = async (
  taskId: string,
  updatedFields: Partial<ITask>
): Promise<ITask | null> => {
  return await prisma.task.update({
    where: {
      id: parseInt(taskId),
    },
    data: updatedFields,
  });
};

/**
 * Delete a task
 * @param {string} userId
 * @param {string} taskId
 * @returns {Promise<void>}
 */
const deleteTask = async (userId: string, taskId: string): Promise<void> => {
  await prisma.task.delete({
    where: {
      id: parseInt(taskId),
    },
  });
};

/**
 * Get all tasks with pagination
 * @param {string} userId
 * @param {number} skip
 * @param {number} take
 * @param {string} searchTag
 * @returns {Promise<ITask[]>}
 */
const getAllTasks = async (
  userId: string,
  skip: number,
  take: number,
  searchTag: string
): Promise<ITask[]> => {
  return await prisma.task.findMany({
    where: {
      userId: parseInt(userId),
      title: {
        contains: searchTag,
      },
    },
    skip,
    take,
  });
};

/**
 * Get task count
 * @param {string} userId
 * @param {string} searchTag
 * @returns {Promise<number>}
 */
const getAllTaskCount = async (userId: string, searchTag: string): Promise<number> => {
  return await prisma.task.count({
    where: {
      userId: parseInt(userId),
      title: {
        contains: searchTag,
      },
    },
  });
};

/**
 * Update a task's rank
 * @param {string} taskId
 * @param {number} rank
 * @returns {Promise<ITask | null>}
 */
const updateRank = async (
  taskId: string,
  rank: number
): Promise<ITask | null> => {
  return await prisma.task.update({
    where: {
      id: parseInt(taskId),
    },
    data: {
      rank,
    },
  });
};

export default {
  create,
  getTaskSingle,
  update,
  deleteTask,
  getAllTasks,
  getAllTaskCount,
  updateRank,
};
