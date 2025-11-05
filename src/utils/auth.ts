import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SALT_ROUNDS = 10;

export const hashPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, SALT_ROUNDS);
};

export const comparePasswords = async (
  plain: string,
  hashed: string
): Promise<boolean> => {
  return bcrypt.compare(plain, hashed);
};

export const generateToken = (userId: number): string => {
  const secret = process.env.JWT_SECRET!;
  const expiresIn = process.env.TOKEN_EXPIRES_IN || "7d";
  return jwt.sign({ id: userId }, secret, { expiresIn });
};
