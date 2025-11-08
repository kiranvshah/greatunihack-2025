import type { Request, Response } from "express";
import { prisma } from "../db/client.js";

/**
 * --- POST /tenancy-transactions ---
 * adds entry to perks table
 */
export const createTenancyTransaction = async (req: Request, res: Response) => {
  try {
    const { monthsPaidFor } = req.body;

    if (!req.user) {
      return res.status(401).json({ error: "Unauthorised (controller)" });
    }
    const userId = req.user.userId;

    if (!monthsPaidFor || Number(monthsPaidFor) <= 0) {
      return res.status(400).json({
        error: "monthsPaidFor is required and must be a positive integer",
      });
    }

    const result = await prisma.$transaction(async (tx) => {
      // find user
      const user = await tx.user.findUniqueOrThrow({
        where: { id: userId },
      });

      const amount = Number(monthsPaidFor) * Number(user.cost_per_month);
      const creditsToAdd = Math.floor(amount / 10);

      // create tenancy transaction
      const transaction = await tx.tenancyTransaction.create({
        data: {
          amount,
          user_id: user.id,
        },
      });

      // update user's wallet and payment date
      const oldNextPaymentDue = user.next_payment_due;
      const newNextPaymentDue = new Date(
        oldNextPaymentDue.setMonth(
          oldNextPaymentDue.getMonth() + monthsPaidFor,
        ),
      );

      const updatedUser = await tx.user.update({
        where: { id: user.id },
        data: {
          wallet_balance: {
            increment: creditsToAdd,
          },
          next_payment_due: newNextPaymentDue,
        },
      });
      return { transaction, updatedUser };
    });

    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: "creating tenancy transaction failed" });
  }
};

/**
 * --- POST /perk-transacitons ---
 * adds entry to perks table
 */
export const createPerkTransaction = async (req: Request, res: Response) => {
  try {
    const { perkId } = req.body;

    if (!req.user) {
      return res.status(401).json({ error: "Unauthorised (controller)" });
    }
    const userId = req.user.userId;

    if (!perkId) {
      return res.status(400).json({
        error: "perkId is required",
      });
    }

    const result = await prisma.$transaction(async (tx) => {
      // find perk
      const perk = await tx.perk.findUniqueOrThrow({
        where: { id: Number(perkId) },
      });

      // find user
      const user = await tx.user.findUniqueOrThrow({
        where: { id: userId },
      });

      // check user has enough balance
      if (user.wallet_balance < perk.cost) {
        throw new Error("Insufficient balance");
      }

      // create perk transaction
      const transaction = await tx.perkTransaction.create({
        data: {
          perk_id: perk.id,
          user_id: user.id,
        },
      });

      // deduct cost from user's wallet
      const updatedUser = await tx.user.update({
        where: { id: user.id },
        data: {
          wallet_balance: {
            decrement: perk.cost,
          },
        },
      });

      return { transaction, updatedUser };
    });

    res.status(201).json(result);
  } catch (error) {
    if (error instanceof Error && error.message === "Insufficient balance") {
      return res.status(400).json({ error: "Insufficient balance" });
    }
    res.status(401).json({ error: "creating perk transaction failed" });
  }
};
