import { Request, Response, NextFunction } from "express";
import User from "../models/User";

export const apiKeyAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const apiKeyHeader = req.headers["x-api-key"];

    if (!apiKeyHeader) {
      return res.status(401).json({ message: "API key required" });
    }

    const apiKey = Array.isArray(apiKeyHeader) ? apiKeyHeader[0] : apiKeyHeader;

    const user: any = await User.findOne({ apiKey });

    if (!user) {
      return res.status(403).json({ message: "Invalid API key" });
    }

    let limit = 10; // Free plan

    if (user.plan === "basic") limit = 50;
    if (user.plan === "premium") limit = 100;

    if (user.usage >= limit) {
      return res.status(429).json({
        message: "Daily API limit reached"
      });
    }

    user.usage += 1;
    await user.save();

    next();
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};


export const getCurrentUser = async (req: Request, res: Response) => {

  if (!req.user) {
    return res.status(401).json({ message: "Not logged in" });
  }
  res.json(req.user);
};