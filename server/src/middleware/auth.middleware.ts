import type {Request, Response, NextFunction} from "express";
import jwt from "jsonwebtoken"

import type { AuthenticatedRequest } from "../types/express.js";

export const AuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    // check authorization header exists
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Unauthorised: no token provided"})
    }

    // get token
    const token = authHeader.split(" ")[1] || ""

    try {
        // verify the token
        const secret = process.env.JWT_SECRET
        if (!secret) {
            throw new Error("Server configuration error")
        }

        const payload = jwt.verify(token, secret);

        // attach payload to request object. cast request to custom AuthenticatedRequest type
        (req as AuthenticatedRequest).user = payload as { userId: number}

        // call the next middleware or route handler
        next()
    } catch (error) {
        return res.status(401).json({ error: "Unauthorised: invalid token "})
    }
}
