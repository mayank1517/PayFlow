import express from "express";
import {
  submitExpense,
  getExpenses,
  updateExpenseStatus,
  getExpensesForEmployee,
} from "../Controllers/expenses.controller.js";
import { authMiddleware } from "../Middlewares/auth.middleware.js";

const router = express.Router();

// Employee: Submit a new expense
router.post("/submit-expense", authMiddleware, submitExpense);

// Employee: View own expenses
router.get("/get-expenses", authMiddleware, getExpenses);
router.get("/get-expense", authMiddleware, getExpensesForEmployee);

// Admin: Approve or reject an expense
router.put("/status", authMiddleware, updateExpenseStatus);

export default router;
