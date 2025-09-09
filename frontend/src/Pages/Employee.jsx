import { useEffect, useState } from "react";
import axiosInstance from "../lib/axios";
import toast from "react-hot-toast";

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await axiosInstance.get("auth/users"); // adjust endpoint if needed
        setEmployees(res.data);
      } catch (err) {
        toast.error(err.response?.data?.message || "Failed to fetch employees");
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-yellow-800">Employees</h1>

      {loading ? (
        <p className="text-yellow-600">Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-xl shadow-md border border-yellow-200">
            <thead className="bg-yellow-100 text-yellow-800">
              <tr>
                <th className="text-left px-6 py-4">Name</th>
                <th className="text-left px-6 py-4">Role</th>
                <th className="text-left px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {employees.map((emp, idx) => (
                <tr
                  key={idx}
                  className="border-t border-yellow-100 hover:bg-yellow-50"
                >
                  <td className="px-6 py-4">{emp.fullName || emp.name}</td>
                  <td className="px-6 py-4">{emp.role}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-block px-3 py-1 text-xs font-medium rounded-full leading-none ${
                        emp.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : emp.status === "On Leave"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {emp.status || "Active"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Employees;
