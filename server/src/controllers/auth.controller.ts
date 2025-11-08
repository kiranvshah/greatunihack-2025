import type { Request, Response } from "express";
import { prisma } from "../db/client.js";
import jwt from "jsonwebtoken";

/**
 * --- POST /auth/login ---
 * (development route) takes a userId and returns a JSON web token
 */
export const login = async (req: Request, res: Response) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ error: "userId is required" });
  }

  try {
    // check user exists
    const user = await prisma.user.findUniqueOrThrow({
      where: {
        id: Number(userId),
      },
    });

    // get secret
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error("JWT_SECRET not set in .env");
    }

    // create (sign) the token
    const token = jwt.sign({ userId: user.id }, secret, { expiresIn: "1h" });

    // send token to user
    res.status(200).json({ token });
  } catch (error) {
    res.status(401).json({ error: "Login failed" });
  }
};
