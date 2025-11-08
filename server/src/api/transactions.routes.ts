import { Router } from "express";
import { AuthMiddleware } from "../middleware/auth.middleware.js";
import {
  createTenancyTransaction,
  createPerkTransaction,
} from "../controllers/transactions.controller.js";

const router: Router = Router();

// POST /tenancy-transactions
router.post("/tenancy-transactions", AuthMiddleware, createTenancyTransaction);

// POST /perk-transactions
router.post("/perk-transactions", AuthMiddleware, createPerkTransaction);

export default router;
