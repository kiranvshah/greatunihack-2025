import { Router } from "express";
import { getPerks } from "../controllers/perk.controller.js";

const router: Router = Router();

// GET /perks
router.get("/perks", getPerks);

export default router;
