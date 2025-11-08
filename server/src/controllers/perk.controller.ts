import type { Request, Response } from "express";
import { prisma } from "../db/client.js";

/**
 * --- GET /perks ---
 * returns a list of all perks
 */
export const getPerks = async (req: Request, res: Response) => {
  try {
    const perks = await prisma.perk.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        cost: true,
        image_url: true,
      },
    });
    res.status(200).json(perks);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch perks" });
  }
};
