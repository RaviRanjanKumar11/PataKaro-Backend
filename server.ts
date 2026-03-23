import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import { connectDB } from "./config/db";
import apiRoutes from "./routes/apiRoutes";
import session from "express-session";
import passport from "passport";
import "./config/passport";
import authRoutes from "./routes/authRoutes";

const app = express();

app.use(cors());
app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: false
  })
);

app.use("/api", apiRoutes);
connectDB();
app.use("/auth", authRoutes);
app.get("/", (req, res) => {
  res.send("API Running");
});
app.use(cors({
  origin: ["http://localhost:5173", "https://patakarogo.netlify.app"],
  credentials: true
}));

const PORT = process.env.PORT || 5000;
app.use(passport.initialize());
app.use(passport.session());


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
