import { Router } from "express";
import { createAttendance } from "../controllers/attendanceController";
import { authenticate } from "../middleware/auth";
const router = Router();
router.post("/", authenticate, createAttendance);
export default router;
