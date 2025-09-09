import { useState } from "react";
import axiosInstance from "../lib/axios";
import toast from "react-hot-toast";

const SubmitExpense = () => {
  const [form, setForm] = useState({
    amount: "",
    category: "",
    description: "",
    month: "",
    year: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post("/expense/submit-expense", form);
      toast.success("Expense submitted successfully");
      setForm({
        amount: "",
        category: "",
        description: "",
        month: "",
        year: "",
      });
    } catch (err) {
      toast.error(err.response?.data?.message || "Submission failed");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow-md space-y-4 border border-yellow-200"
    >
      <h2 className="text-lg font-semibold text-yellow-700">
        Submit Monthly Expense
      </h2>

      <div>
        <label className="block text-sm font-medium text-yellow-800">
          Amount (₹) <span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          name="amount"
          value={form.amount}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-yellow-800">
          Category <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="category"
          value={form.category}
          onChange={handleChange}
          placeholder="e.g. Travel, Meals"
          required
          className="w-full px-4 py-2 border border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-yellow-800">
          Description <span className="text-red-500">*</span>
        </label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows={3}
          required
          className="w-full px-4 py-2 border border-yellow-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-yellow-800">
            Month <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="month"
            value={form.month}
            onChange={handleChange}
            placeholder="e.g. August"
            required
            className="w-full px-4 py-2 border border-yellow-300 rounded-lg"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-yellow-800">
            Year <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="year"
            value={form.year}
            onChange={handleChange}
            placeholder="e.g. 2025"
            required
            className="w-full px-4 py-2 border border-yellow-300 rounded-lg"
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full py-2 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600 transition"
      >
        Submit Expense
      </button>
    </form>
  );
};

export default SubmitExpense;
