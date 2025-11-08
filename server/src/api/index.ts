import { Router } from "express";
import authRoutes from "./auth.routes.js";
import perkRoutes from "./perks.route.js";
import transactionRoutes from "./transactions.routes.js";
import userRoutes from "./user.routes.js";

const router: Router = Router();

router.use(authRoutes);
router.use(transactionRoutes);
router.use(perkRoutes);
router.use(userRoutes);

export default router;
