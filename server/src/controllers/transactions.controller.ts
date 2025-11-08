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
      return res.status(400).json({ error: "monthsPaidFor is required and must be a positive integer" });
    }

    // find user
    const user = await prisma.user.findUniqueOrThrow({
      where: {
        id: Number(userId),
      },
    });

    const amount = monthsPaidFor * Number(user.cost_per_month);

    // create tenancy transaction
    await prisma.tenancyTransaction.create({
      data: {
        amount,
        user_id: userId,
      },
    });

    // add credit to balance
    const creditsToAdd = amount;
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        wallet_balance: {
          increment: creditsToAdd,
        },
      },
    });

    // update next_payment_by field on user
    const currentNextPaymentDue = user.next_payment_due;
    const newNextPaymentDue = new Date(
      currentNextPaymentDue.setMonth(
        currentNextPaymentDue.getMonth() + monthsPaidFor
      )
    );
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        next_payment_due: newNextPaymentDue,
      },
    });

    res.status(201).json({ message: "tenancy transaction created successfully" });

  } catch (error) {
    console.error(error);
    res.status(401).json({ error: "creating tenancy transaction failed" })
  }
};

/**
 * --- POST /perk-transacitons ---
 * adds entry to perks table
 */
export const createPerkTransaction = async (req: Request, res: Response) => {
  // todo
  res.status(501);
}
