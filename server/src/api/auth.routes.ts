import { Router } from "express";
import { login } from "../controllers/auth.controller.js";

const router: Router = Router();

// POST /api/v1/auth/login
router.post("/auth/login", login);

export default router;
