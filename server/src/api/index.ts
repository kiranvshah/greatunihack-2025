import { Router } from "express";
import authRoutes from "./auth.routes.js";
import perkRoutes from "./perks.route.js";
import userRoutes from "./user.routes.js";

const router: Router = Router();

router.use(authRoutes);
router.use(perkRoutes);
router.use(userRoutes);

export default router;
