import { Router } from "express";
import { AuthMiddleware } from "../middleware/auth.middleware.js";
import { getUser } from "../controllers/user.controller.js";

const router: Router = Router();

// GET /users/:userId
router.get("/users/:userId", AuthMiddleware, getUser);

export default router;
