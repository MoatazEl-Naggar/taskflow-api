import express from "express";
import cors from "cors";
import morgan from "morgan";
import userRoutes from "./routes/user.routes";
import taskRoutes from "./routes/task.routes";
import { errorHandler } from "./middleware/error.middleware";

const app = express();

// 🧩 Global Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// 🩺 Health check route
app.get("/", (_req, res) => {
  res.json({ message: "✅ TaskFlow API is running!" });
});

// 🧭 API Routes
app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);

// ⚙️ Global error handler (must be last)
app.use(errorHandler);

export default app;
