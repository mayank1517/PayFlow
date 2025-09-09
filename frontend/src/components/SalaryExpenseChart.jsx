import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";

const SalaryExpenseChart = ({ salaryData, expenseData }) => {
  // Filter only approved expenses
  const approvedExpenses = expenseData.filter(
    (e) => e.status?.toLowerCase() === "approved"
  );

  // Normalize month-year keys from both datasets
  const allKeys = new Set([
    ...salaryData.map((s) => `${s.month?.toLowerCase()}-${s.year}`),
    ...approvedExpenses.map((e) => `${e.month?.toLowerCase()}-${e.year}`),
  ]);

  // Merge salary and approved expense data
  const mergedData = Array.from(allKeys).map((key) => {
    const [monthKey, year] = key.split("-");
    const sal = salaryData.find(
      (s) => s.month?.toLowerCase() === monthKey && String(s.year) === year
    );
    const exp = approvedExpenses.find(
      (e) => e.month?.toLowerCase() === monthKey && String(e.year) === year
    );

    return {
      month: `${monthKey.charAt(0).toUpperCase() + monthKey.slice(1)} ${year}`,
      Salary: Number(sal?.netSalary) || 0,
      Expense: Number(exp?.amount) || 0,
    };
  });

  // Sort by year then month
  const monthOrder = {
    january: 1,
    february: 2,
    march: 3,
    april: 4,
    may: 5,
    june: 6,
    july: 7,
    august: 8,
    september: 9,
    october: 10,
    november: 11,
    december: 12,
  };

  mergedData.sort((a, b) => {
    const [monthA, yearA] = a.month.split(" ");
    const [monthB, yearB] = b.month.split(" ");
    return Number(yearA) !== Number(yearB)
      ? Number(yearA) - Number(yearB)
      : monthOrder[monthA.toLowerCase()] - monthOrder[monthB.toLowerCase()];
  });

  console.log("Approved Expenses:", approvedExpenses);
  console.log("Merged Chart Data:", mergedData);

  return (
    <div className="bg-white p-4 rounded-xl shadow-md border border-yellow-200">
      <h3 className="text-lg font-semibold text-yellow-700 mb-4">
        Salary vs Approved Expense Overview
      </h3>
      {mergedData.length === 0 ? (
        <p className="text-yellow-600">No data available</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={mergedData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Salary" fill="#facc15" />
            <Bar dataKey="Expense" fill="#f87171" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default SalaryExpenseChart;
