import Expense from "../Models/Expenses.model.js";
export const submitExpense = async (req, res) => {
  const { amount, category, description, month, year } = req.body;
  const expense = await Expense.create({
    employeeId: req.user.id,
    amount,
    category,
    description,
    month,
    year,
    status: "Pending",
  });
  res.status(201).json(expense);
};

export const getExpensesForEmployee = async (req, res) => {
  const expenses = await Expense.find({ employeeId: req.user.id });
  res.status(200).json(expenses);
};
export const getExpenses = async (req, res) => {
  const expenses = await Expense.find();
  res.status(200).json(expenses);
};

export const updateExpenseStatus = async (req, res) => {
  const { expenseId, status } = req.body;
  const updated = await Expense.findByIdAndUpdate(
    expenseId,
    { status },
    { new: true }
  );
  res.status(200).json(updated);
};
