import { useEffect, useState } from "react";
import axiosInstance from "../lib/axios";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";
import SalaryExpenseChart from "../components/SalaryExpenseChart";

const AllExpenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [salarySlips, setSalarySlips] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const isAdmin = user?.role === "admin";

  const fetchExpenses = async () => {
    const endpoint = isAdmin ? "/expense/get-expenses" : "/expense/get-expense";
    try {
      const res = await axiosInstance.get(endpoint);
      setExpenses(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      toast.error("Failed to load expenses");
    }
  };

  const fetchSalarySlips = async () => {
    try {
      const res = await axiosInstance.get("/slips/salary-slips");
      const data = Array.isArray(res.data.slips) ? res.data.slips : [];
      setSalarySlips(data);
    } catch (err) {
      toast.error("Failed to load salary slips");
    }
  };

  useEffect(() => {
    const fetchAll = async () => {
      await fetchExpenses();
      if (isAdmin) {
        await fetchSalarySlips();
      }
      setLoading(false);
    };
    fetchAll();
  }, [isAdmin]);

  const updateStatus = async (id, status) => {
    try {
      await axiosInstance.put("/expense/status", { expenseId: id, status });
      toast.success(`Marked as ${status}`);
      fetchExpenses(); // refresh list
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  const approvedExpenses = expenses.filter(
    (exp) => exp.status?.toLowerCase() === "approved"
  );

  return (
    <div className="space-y-8">
      {!loading && isAdmin && (
        <SalaryExpenseChart
          salaryData={salarySlips}
          expenseData={approvedExpenses}
        />
      )}

      <div className="bg-white p-6 rounded-xl shadow-md border border-yellow-200">
        <h2 className="text-lg font-semibold text-yellow-700 mb-4">
          Expense History
        </h2>

        {loading ? (
          <p className="text-yellow-600">Loading...</p>
        ) : expenses.length === 0 ? (
          <p className="text-yellow-600">No expenses found</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-gray-700">
              <thead className="bg-yellow-100 text-yellow-800">
                <tr>
                  <th className="text-left px-4 py-2">Month</th>
                  <th className="text-left px-4 py-2">Year</th>
                  <th className="text-left px-4 py-2">Category</th>
                  <th className="text-left px-4 py-2">Amount</th>
                  <th className="text-left px-4 py-2">Description</th>
                  <th className="text-left px-4 py-2">Status</th>
                  {isAdmin && <th className="text-left px-4 py-2">Actions</th>}
                </tr>
              </thead>
              <tbody>
                {expenses.map((exp, idx) => (
                  <tr
                    key={idx}
                    className="border-t border-yellow-100 hover:bg-yellow-50"
                  >
                    <td className="px-4 py-2">{exp.month}</td>
                    <td className="px-4 py-2">{exp.year}</td>
                    <td className="px-4 py-2">{exp.category}</td>
                    <td className="px-4 py-2">₹{exp.amount}</td>
                    <td className="px-4 py-2">{exp.description}</td>
                    <td className="px-4 py-2">
                      <span
                        className={`inline-block px-3 py-1 text-xs font-medium rounded-full leading-none ${
                          exp.status === "Approved"
                            ? "bg-green-100 text-green-700"
                            : exp.status === "Rejected"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {exp.status}
                      </span>
                    </td>
                    {isAdmin && (
                      <td className="px-4 py-2 space-x-2">
                        <button
                          onClick={() => updateStatus(exp._id, "Approved")}
                          className="px-3 py-1 text-xs bg-green-500 text-white rounded hover:bg-green-600"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => updateStatus(exp._id, "Rejected")}
                          className="px-3 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600"
                        >
                          Reject
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllExpenses;
