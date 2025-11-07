import { Router } from "express";
import {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} from "../controllers/task.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

// ✅ Create a new task
router.post("/", authMiddleware, createTask);

// ✅ Get all tasks for the authenticated user
router.get("/", authMiddleware, getTasks);

// ✅ Update a task by ID
router.put("/:id", authMiddleware, updateTask);

// ✅ Delete a task by ID
router.delete("/:id", authMiddleware, deleteTask);

export default router;
