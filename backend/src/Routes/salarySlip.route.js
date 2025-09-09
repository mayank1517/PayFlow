import express from "express";
import { authMiddleware } from "../Middlewares/auth.middleware.js";
import {
  createSalarySlip,
  updateSalarySlip,
  getAllSalarySlips,
  getEmployeeSalarySlips, // Optional: for admin dashboard
} from "../Controllers/salarySlip.controller.js";

const router = express.Router();

// Create a salary slip (admin only)
router.post("/salary-slip", authMiddleware, createSalarySlip);

// Update a salary slip (admin only)
router.put("/salary-slip/:slipId", authMiddleware, updateSalarySlip);

// Optional: Get all salary slips (admin dashboard)
router.get("/salary-slips", authMiddleware, getAllSalarySlips);

router.get("/salary-slip", authMiddleware, getEmployeeSalarySlips);

export default router;
