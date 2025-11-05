import { Request, Response } from "express";
import prisma from "../prisma/client";

export const createTask = async (req: Request, res: Response) => {
  try {
    const { title, description, userId } = req.body;
    const task = await prisma.task.create({
      data: { title, description, userId },
    });
    res.status(201).json(task);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getTasks = async (req: Request, res: Response) => {
  const tasks = await prisma.task.findMany({ include: { user: true } });
  res.json(tasks);
};
