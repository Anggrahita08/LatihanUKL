import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import authRoutes from "./routes/auth";
import userRoutes from "./routes/users";
import attendanceRoutes from "./routes/attendance";
import { prisma } from "./prismaClient";

dotenv.config();

const app = express();
app.use(cors());
app.use(helmet());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/attendance", attendanceRoutes);

app.get("/", (req, res) => res.send("API Presensi (TypeScript + PostgreSQL) aktif!"));

const PORT = process.env.PORT || 4000;
app.listen(PORT, async () => {
  await prisma.$connect();
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
