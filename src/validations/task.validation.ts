import { z } from "zod";

export const taskSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
});

export const updateTaskSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  status: z.enum(["pending", "in-progress", "completed"]).optional(),
});
