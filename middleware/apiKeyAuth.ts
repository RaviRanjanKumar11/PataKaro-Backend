import { Request, Response, NextFunction } from "express";
import User from "../models/User";

export const apiKeyAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const apiKeyHeader = req.headers["x-api-key"];

    if (!apiKeyHeader) {
      return res.status(401).json({ message: "API key required" });
    }

    const apiKey = (Array.isArray(apiKeyHeader) ? apiKeyHeader[0] : apiKeyHeader)?.toString().trim();

    if (!apiKey || apiKey.toLowerCase() === "undefined" || apiKey.toLowerCase() === "null") {
      return res.status(401).json({ message: "Valid API key required" });
    }

    const user: any = await User.findOne({ apiKey });

    if (!user) {
      return res.status(403).json({ message: "Invalid API key" });
    }

    // Attach user to request for downstream handlers if needed
    (req as any).user = user;

    let limit = 20; // Free plan

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
    console.error("apiKeyAuth error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getCurrentUser = async (req: any, res: Response) => {

  if (!req.user) {
    return res.status(401).json({ message: "Not logged in" });
  }

  res.json({
    id: req.user._id,
    name: req.user.name,
    email: req.user.email,  
    apiKey: req.user.apiKey,
    plan: req.user.plan
  });
};