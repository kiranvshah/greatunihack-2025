import { Router } from "express";
import { getPerks, createPerk } from "../controllers/perk.controller.js";

const router: Router = Router();

// GET /perks
router.get("/perks", getPerks);

// POST /perks
router.post("/perks", createPerk);

export default router;
