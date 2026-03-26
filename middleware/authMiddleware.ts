import { Request, Response, NextFunction } from "express";
import { apiKeyAuth } from "./apiKeyAuth";

export const requireLogin = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated && req.isAuthenticated()) {
    return next();
  }

  return res.status(401).json({ message: "Login required" });
};

export const requireLoginOrApiKey = async (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated && req.isAuthenticated()) {
    return next();
  }

  // Fall back to API key auth, this will handle responses if invalid/missing
  return apiKeyAuth(req, res, next);
};
