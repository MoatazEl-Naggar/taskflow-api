import prisma from "../prisma/client";
import { logger } from "../utils/logger";

export const TaskService = {
  create: async (data: { title: string; description?: string; userId: number }) => {
    try {
      logger.info(`Creating task for user ${data.userId}`);
      const task = await prisma.task.create({ data });
      logger.info(`Task created successfully (ID: ${task.id}) for user ${data.userId}`);
      return task;
    } catch (error: any) {
      logger.error("Error creating task:", error.message);
      throw new Error("Failed to create task");
    }
  },

  getUserTasks: async (userId: number) => {
    try {
      logger.info(`Fetching tasks for user ${userId}`);
      const tasks = await prisma.task.findMany({ where: { userId } });
      logger.info(`Fetched ${tasks.length} tasks for user ${userId}`);
      return tasks;
    } catch (error: any) {
      logger.error(`Error fetching tasks for user ${userId}:`, error.message);
      throw new Error("Failed to fetch tasks");
    }
  },

  update: async (
    taskId: number,
    userId: number,
    data: { title?: string; description?: string; status?: string }
  ) => {
    try {
      logger.info(`User ${userId} requested task update (ID: ${taskId})`);

      const task = await prisma.task.findUnique({ where: { id: taskId } });
      if (!task) {
        logger.warn(`Task not found (ID: ${taskId})`);
        throw new Error("Task not found");
      }
      if (task.userId !== userId) {
        logger.warn(`Unauthorized update attempt by user ${userId} on task ${taskId}`);
        throw new Error("Unauthorized");
      }

      const updatedTask = await prisma.task.update({ where: { id: taskId }, data });
      logger.info(`Task ${taskId} updated successfully by user ${userId}`);
      return updatedTask;
    } catch (error: any) {
      logger.error(`Error updating task ${taskId}:`, error.message);
      throw new Error("Failed to update task");
    }
  },

  // ✅ Renamed from "delete" → "remove" to match controller
  remove: async (taskId: number, userId: number) => {
    try {
      logger.info(`User ${userId} requested task deletion (ID: ${taskId})`);

      const task = await prisma.task.findUnique({ where: { id: taskId } });
      if (!task) {
        logger.warn(`Task not found (ID: ${taskId})`);
        throw new Error("Task not found");
      }
      if (task.userId !== userId) {
        logger.warn(`Unauthorized delete attempt by user ${userId} on task ${taskId}`);
        throw new Error("Unauthorized");
      }

      const deletedTask = await prisma.task.delete({ where: { id: taskId } });
      logger.info(`Task ${taskId} deleted successfully by user ${userId}`);
      return deletedTask;
    } catch (error: any) {
      logger.error(`Error deleting task ${taskId}:`, error.message);
      throw new Error("Failed to delete task");
    }
  },
};
