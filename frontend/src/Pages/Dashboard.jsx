import useAuth from "../hooks/useAuth";
import SalarySlip from "./SalarySlip";
import SubmitExpense from "./SubmitExpense";
import ManageSlips from "./ManageSlips";

const Dashboard = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <p className="text-yellow-600">Loading dashboard...</p>;
  }

  if (!user) {
    return <p className="text-red-500">Unauthorized access</p>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-yellow-800">Dashboard</h1>

      {user.role === "admin" ? <ManageSlips /> : <SubmitExpense />}
      <SalarySlip />
    </div>
  );
};

export default Dashboard;
