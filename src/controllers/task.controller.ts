import { Response, NextFunction } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import { taskSchema, updateTaskSchema } from "../validations/task.validation";
import { TaskService } from "../services/task.service";
import { logger } from "../utils/logger";

export const createTask = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    logger.info("POST /tasks — Create task request received");

    const { title, description } = taskSchema.parse(req.body);
    if (!req.userId) throw new Error("Unauthorized");

    const task = await TaskService.create({
      title,
      description,
      userId: req.userId,
    });

    logger.info(`✅ Task created successfully by user ${req.userId} (ID: ${task.id})`);
    res.status(201).json(task);
  } catch (error: any) {
    logger.error("❌ Error in createTask:", error.message);
    next(error);
  }
};

export const getTasks = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    logger.info("GET /tasks — Fetch user tasks");

    if (!req.userId) throw new Error("Unauthorized");

    const tasks = await TaskService.getUserTasks(req.userId);

    logger.info(`✅ Retrieved ${tasks.length} tasks for user ${req.userId}`);
    res.json(tasks);
  } catch (error: any) {
    logger.error("❌ Error in getTasks:", error.message);
    next(error);
  }
};

export const updateTask = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    logger.info("PUT /tasks/:id — Update task request");

    if (!req.userId) throw new Error("Unauthorized");
    const id = parseInt(req.params.id);
    const data = updateTaskSchema.parse(req.body);

    const updatedTask = await TaskService.update(id, req.userId, data);

    logger.info(`✅ Task ${id} updated successfully by user ${req.userId}`);
    res.json(updatedTask);
  } catch (error: any) {
    logger.error("❌ Error in updateTask:", error.message);
    next(error);
  }
};

export const deleteTask = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    logger.info("DELETE /tasks/:id — Delete task request");

    if (!req.userId) throw new Error("Unauthorized");
    const id = parseInt(req.params.id);

    await TaskService.remove(id, req.userId);

    logger.info(`✅ Task ${id} deleted successfully by user ${req.userId}`);
    res.json({ message: "Task deleted successfully" });
  } catch (error: any) {
    logger.error("❌ Error in deleteTask:", error.message);
    next(error);
  }
};
