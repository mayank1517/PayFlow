import express from "express";
import dotenv from "dotenv";
import authRoutes from "./Routes/auth.routes.js";
import salarySlipsRoute from "./Routes/salarySlip.route.js";
import cookieParser from "cookie-parser";
import expenseRoute from "./Routes/expense.route.js";
import { connectDB } from "./lib/db.js";
import cors from "cors";
import path from "path";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(cookieParser());

const PORT = process.env.PORT || 3000;
const __dirname = path.resolve();

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/slips", salarySlipsRoute);
app.use("/api/expense", expenseRoute);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("/*path", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});
