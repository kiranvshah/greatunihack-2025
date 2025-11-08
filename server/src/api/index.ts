import { Router } from "express";
import authRoutes from "./auth.routes.js"
import perkRoutes from "./perks.route.js";

const router: Router = Router();

router.use(authRoutes);
router.use(perkRoutes);

export default router;
