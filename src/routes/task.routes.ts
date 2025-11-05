import { Router } from "express";
import { createTask, getTasks } from "../controllers/task.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.post("/", authMiddleware, createTask);
router.get("/", authMiddleware, getTasks);

export default router;
