import rateLimit from "express-rate-limit";

export const apiLimiter = rateLimit({

  windowMs: 15 * 60 * 1000, // 15 minutes

  max: 4, // limit each IP

  message: {
    success: false,
    message: "Too many requests. Please try again later."
  },

  standardHeaders: true,
  legacyHeaders: false

});

// Max 5 requests per 15 minutes per IP