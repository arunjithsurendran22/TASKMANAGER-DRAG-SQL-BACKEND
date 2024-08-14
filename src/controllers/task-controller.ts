import { Request, Response, NextFunction } from "express";
import { ITask } from "../models/task/task-model";
import ApiResponse from "../utils/api-response";
import ERROR from "../middlewares/web_server/http-error";
import { taskService } from "../services";

/**
 * Create a task
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
const createTask = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, userId } = req.body;
    console.log("name",name);
    
    if (!userId) {
      return next(new ERROR.AuthorizationError("Unauthorized"));
    }
    // Check if a task with the same title already exists
    const existingTask = await taskService.getTaskByTitle(name);
    if (existingTask) {
      return next(
        new ERROR.DocumentExistsError("Task with this title already exists.")
      );
    }
    const newTask: ITask = await taskService.createTask(name, userId);

    const apiResponse: ApiResponse<{ task: ITask }> = new ApiResponse<{
      task: ITask;
    }>();
    apiResponse.message = "Success!";
    apiResponse.data = { task: newTask };
    apiResponse.statusCode = 201;
    res.json(apiResponse);
  } catch (error) {
    next(error);
  }
};

/**
 * Update a task
 * @param { Request } req
 * @param { Response } res
 * @param { NextFunction } next
 */
const updateTask = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, userId } = req.body;
    const { taskId } = req.params;

    if (!userId) {
      return next(new ERROR.AuthorizationError("Unauthorized"));
    }

    const updatedTask: ITask = await taskService.updateTask(taskId, {
      name,
    });

    const apiResponse: ApiResponse<{ task: ITask }> = new ApiResponse<{
      task: ITask;
    }>();
    apiResponse.message = "Success!";
    apiResponse.data = { task: updatedTask };
    apiResponse.statusCode = 200;
    res.json(apiResponse);
  } catch (error) {
    next(error);
  }
};

/**
 * Get all tasks by user ID
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
const getAllTasks = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { userId } = req.body;
    if (!userId) {
      return next(new ERROR.AuthorizationError("Unauthorized"));
    }
    const pageNumber: number = req.query.pageNumber
      ? parseInt(req.query.pageNumber as string)
      : 1;
    const pageSize: number = req.query.pageSize
      ? parseInt(req.query.pageSize as string)
      : 12;
    const searchTag: string = req.query.searchTag
      ? (req.query.searchTag as string)
      : "";

    const { tasks, totalCount } = await taskService.getAllTasks(
      userId,
      pageNumber,
      pageSize,
      searchTag
    );

    const apiResponse: ApiResponse<{ tasks: ITask[]; totalCount: number }> =
      new ApiResponse<{
        tasks: ITask[];
        totalCount: number;
      }>();

    apiResponse.message = "Tasks fetched successfully!";
    apiResponse.data = { tasks, totalCount };
    apiResponse.statusCode = 200;
    res.json(apiResponse);
  } catch (error) {
    next(error);
  }
};

/**
 * Delete a task
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
const deleteTask = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { userId } = req.body;
    const { taskId } = req.params;

    if (!userId) {
      return next(new ERROR.AuthorizationError("Unauthorized"));
    }

    await taskService.deleteTask(userId, taskId);

    const apiResponse: ApiResponse<{ task: ITask | null }> = new ApiResponse<{
      task: ITask | null;
    }>();
    apiResponse.message = "Task deleted successfully";
    apiResponse.data = { task: null };
    apiResponse.statusCode = 200;
    res.json(apiResponse);
  } catch (error) {
    next(error);
  }
};

/**
 * Update a task's status
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
const updateStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { newStatus, userId } = req.body;
    const { taskId } = req.params;

    if (!userId) {
      return next(new ERROR.AuthorizationError("Unauthorized"));
    }

    

    const updatedTask = await taskService.updateStatus(taskId, newStatus);

    const apiResponse: ApiResponse<{ task: ITask | null }> = new ApiResponse<{ task: ITask | null }>();
    apiResponse.message = "Task status updated successfully";
    apiResponse.data = { task: updatedTask };
    apiResponse.statusCode = 200;
    res.json(apiResponse);
  } catch (error) {
    next(error);
  }
};

export default {
  createTask,
  updateTask,
  getAllTasks,
  deleteTask,
  updateStatus,
};