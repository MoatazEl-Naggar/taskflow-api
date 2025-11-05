import { Request, Response } from "express";
import prisma from "../prisma/client";
import { hashPassword, comparePasswords, generateToken } from "../utils/auth";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser)
      return res.status(400).json({ error: "Email already exists" });

    const hashed = await hashPassword(password);

    const user = await prisma.user.create({
      data: { username, email, password: hashed },
    });

    const token = generateToken(user.id);

    res.status(201).json({ user, token });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user)
      return res.status(404).json({ error: "Invalid email or password" });

    const valid = await comparePasswords(password, user.password);
    if (!valid)
      return res.status(401).json({ error: "Invalid email or password" });

    const token = generateToken(user.id);

    res.json({ user, token });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  const users = await prisma.user.findMany();
  res.json(users);
};
