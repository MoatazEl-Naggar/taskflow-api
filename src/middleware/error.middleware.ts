import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { logger } from "../utils/logger";

interface AppError extends Error {
  status?: number;
}

export const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Log the error clearly
  logger.error(`🔥 Error: ${err.message}`, err.stack);

  // 🧩 Zod validation error handling
  if (err instanceof ZodError) {
    return res.status(400).json({
      success: false,
      error: "Validation Error",
      details: err.errors.map((e) => ({
        path: e.path.join("."),
        message: e.message,
      })),
    });
  }

  // 🧱 Generic error handler
  const status = err.status || 500;

  res.status(status).json({
    success: false,
    error: err.message || "Internal Server Error",
  });
};
