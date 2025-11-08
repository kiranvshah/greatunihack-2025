import { Router } from "express";
import perkRoutes from "./perks.route.js";

const router: Router = Router();

router.use(perkRoutes);

export default router;
