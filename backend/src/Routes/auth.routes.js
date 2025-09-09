import express from "express";
import {
  register,
  login,
  logout,
  getUserProfile,
  getAllUsers,
} from "../Controllers/auth.controller.js";
import { authMiddleware } from "../Middlewares/auth.middleware.js";

const router = express.Router();

router.post("/signup", register);

router.post("/login", login);

router.post("/logout", logout);

router.get("/users", authMiddleware, getAllUsers);

router.post("/me", authMiddleware, getUserProfile);

export default router;
