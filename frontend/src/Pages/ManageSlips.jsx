import { useState } from "react";
import axiosInstance from "../lib/axios";
import toast from "react-hot-toast";
import AsyncSelect from "react-select/async";
import useAuth from "../hooks/useAuth";

const monthOptions = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const ManageSlips = () => {
  const { user } = useAuth(); // assumes admin is logged in
  const [form, setForm] = useState({
    employeeId: "",
    month: "",
    year: "",
    basicPay: "",
    hra: "",
    allowances: "",
    deductions: "",
    notes: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSelect = (selected) => {
    setForm({ ...form, employeeId: selected?.value });
  };

  const loadOptions = async (inputValue) => {
    try {
      const res = await axiosInstance.get("/auth/users");
      return res.data
        .filter((user) =>
          user.fullName.toLowerCase().includes(inputValue.toLowerCase())
        )
        .map((user) => ({
          label: `${user.fullName} (${user.username}) - ${user.designation}`,
          value: user._id,
        }));
    } catch {
      return [];
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const netSalary =
        Number(form.basicPay) +
        Number(form.hra) +
        Number(form.allowances) -
        Number(form.deductions);

      const payload = {
        ...form,
        netSalary,
        adminId: user._id,
      };

      await axiosInstance.post("/slips/salary-slip", payload);
      toast.success("Salary slip saved successfully");
      setForm({
        employee: "",
        month: "",
        year: "",
        basicPay: "",
        hra: "",
        allowances: "",
        deductions: "",
        notes: "",
      });
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to save salary slip");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow-md space-y-4 border border-yellow-200"
    >
      <h2 className="text-lg font-semibold text-yellow-700">
        Create / Update Salary Slip
      </h2>

      <label className="block text-sm font-medium text-yellow-800">
        Select Employee <span className="text-red-500">*</span>
      </label>
      <AsyncSelect
        cacheOptions
        defaultOptions
        loadOptions={loadOptions}
        onChange={handleSelect}
        placeholder="Search employee..."
        className="text-sm"
      />

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-yellow-800">
            Month <span className="text-red-500">*</span>
          </label>
          <select
            name="month"
            value={form.month}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-yellow-300 rounded-lg"
          >
            <option value="">Select Month</option>
            {monthOptions.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-yellow-800">
            Year <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="year"
            value={form.year}
            onChange={handleChange}
            placeholder="Year"
            required
            className="w-full px-4 py-2 border border-yellow-300 rounded-lg"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-yellow-800">
            Basic Pay <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="basicPay"
            value={form.basicPay}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-yellow-300 rounded-lg"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-yellow-800">
            HRA
          </label>
          <input
            type="number"
            name="hra"
            value={form.hra}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-yellow-300 rounded-lg"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-yellow-800">
            Allowances
          </label>
          <input
            type="number"
            name="allowances"
            value={form.allowances}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-yellow-300 rounded-lg"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-yellow-800">
            Deductions
          </label>
          <input
            type="number"
            name="deductions"
            value={form.deductions}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-yellow-300 rounded-lg"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-yellow-800">
          Notes
        </label>
        <textarea
          name="notes"
          value={form.notes}
          onChange={handleChange}
          rows={3}
          placeholder="Optional notes..."
          className="w-full px-4 py-2 border border-yellow-300 rounded-lg resize-none"
        />
      </div>

      <button
        type="submit"
        className="w-full py-2 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600 transition"
      >
        Save Salary Slip
      </button>
    </form>
  );
};

export default ManageSlips;
