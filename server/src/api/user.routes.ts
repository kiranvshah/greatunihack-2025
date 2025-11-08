import { Router } from "express";
import { AuthMiddleware } from "../middleware/auth.middleware.js";
import { getUser, getUserHistoricalPerkTransactions } from "../controllers/user.controller.js";

const router: Router = Router();

// GET /users/:userId
router.get("/users/:userId", AuthMiddleware, getUser);

// GET /users/:userId/historical-perk-transactions
router.get("/users/:userId/historical-perk-transactions", AuthMiddleware, getUserHistoricalPerkTransactions)

export default router;
