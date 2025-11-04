import { Request, Response } from "express";
import { prisma } from "../prismaClient";
import { AuthRequest } from "../middleware/auth";

export const createAttendance = async (req: AuthRequest, res: Response) => {
  const { status, note } = req.body;
  const userId = req.user?.id;

  if (!status) return res.status(400).json({ message: "Status required" });

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const existing = await prisma.attendance.findFirst({
    where: { userId, date: { gte: today } },
  });

  if (existing) return res.status(409).json({ message: "Already marked attendance today" });

  const attendance = await prisma.attendance.create({
    data: { userId, status, note, date: new Date() },
  });

  res.status(201).json({ attendance });
};
