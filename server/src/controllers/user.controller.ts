import type { Response } from "express";
import type { AuthenticatedRequest } from "../types/express.js";
import { prisma } from "../db/client.js";

/**
 * --- GET /users/:userId ---
 * Returns a user's info
 */
export const getUser = async (req: AuthenticatedRequest, res: Response) => {
  try {
    // get the user ID from the JWT token
    const tokenUserId = req.user.userId;

    // get the user ID from the URL
    const urlUserId = Number(req.params.userId);

    // security check: make sure the authenticated user is the one they are asking for
    if (tokenUserId !== urlUserId) {
      return res
        .status(403)
        .json({ error: "Forbidden: you can only view your own user info" });
    }

    // if check passes, fetch the data
    const user = await prisma.user.findUnique({
      where: {
        id: urlUserId,
      },
      select: {
        id: true,
        name: true,
        wallet_balance: true,
        next_payment_due: true,
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // send the data
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve user info" });
  }
};
