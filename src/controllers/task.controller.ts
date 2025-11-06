import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import prisma from "../prisma/client";

export const createTask = async (req: AuthRequest, res: Response) => {
  try {
    const { title, description } = req.body;

    if (!req.userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const task = await prisma.task.create({
      data: {
        title,
        description,
        userId: req.userId, // ✅ comes from token
      },
    });

    res.status(201).json(task);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export const getTasks = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const tasks = await prisma.task.findMany({
      where: { userId: req.userId }, // ✅ only user's tasks
      include: { user: true },
    });

    res.json(tasks);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
