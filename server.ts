import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import session from "express-session";
import passport from "passport";

import { connectDB } from "./config/db";
import apiRoutes from "./routes/apiRoutes";
import authRoutes from "./routes/authRoutes";
import "./config/passport";

const app = express();

/* Middlewares */
app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:5173",
       "https://patakarogo.netlify.app",
      "https://pata-karo-frontend.vercel.app"],
    credentials: true
  })
);


app.set("trust proxy", 1);

app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: true,
      sameSite: "none"
    }
  })
);

/* Passport */
app.use(passport.initialize());
app.use(passport.session());

/* Database */
connectDB();

/* Routes */
app.use("/api", apiRoutes);
app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("PataKaro Backend Running 🚀");
});

/* Server */
const PORT = Number(process.env.PORT) || 10000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});