import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();

// middlewares
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: true
}));
app.use(express.json());

// routes
app.use("/api", taskRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);  // ✅ FIXED
app.use("/api/users", userRoutes);

// health check
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    database: "connected"
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
