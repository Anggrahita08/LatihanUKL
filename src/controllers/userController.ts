import { Request, Response } from "express";
import { prisma } from "../prismaClient";
import { hashPassword } from "../utils/hash";

export const createUser = async (req: Request, res: Response) => {
  const { name, email, password, role, class: className } = req.body;
  if (!name || !email || !password || !role)
    return res.status(400).json({ message: "Missing required fields" });

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return res.status(409).json({ message: "Email already exists" });

  const hashed = await hashPassword(password);
  const user = await prisma.user.create({
    data: { name, email, password: hashed, role, class: className },
  });

  res.status(201).json({ user });
};
