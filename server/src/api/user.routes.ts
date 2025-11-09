import { Router } from "express";
import { AuthMiddleware } from "../middleware/auth.middleware.js";
import {
  getUser,
  getUserHistoricalPerkTransactions,
  getUserTenancyTransactionCount,
} from "../controllers/user.controller.js";

const router: Router = Router();

// GET /users/:userId
router.get("/users/:userId", AuthMiddleware, getUser);

// GET /users/:userId/historical-perk-transactions
router.get(
  "/users/:userId/historical-perk-transactions",
  AuthMiddleware,
  getUserHistoricalPerkTransactions,
);

// GET /users/:userId/tenancy-transaction-count
router.get(
  "/users/:userId/tenancy-transaction-count",
  AuthMiddleware,
  getUserTenancyTransactionCount,
);

export default router;
