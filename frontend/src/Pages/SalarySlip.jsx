import { useEffect, useState } from "react";
import axiosInstance from "../lib/axios";
import toast from "react-hot-toast";
import useAuth from "../hooks/useAuth";

const SalarySlips = () => {
  const { user, userloading } = useAuth();
  const isAdmin = user?.role === "admin";

  const [slips, setSlips] = useState([]);
  const [editingSlip, setEditingSlip] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchSlips = async () => {
    try {
      const endpoint = isAdmin ? "/slips/salary-slips" : "/slips/salary-slip";
      const res = await axiosInstance.get(endpoint);
      const data = Array.isArray(res.data.slips) ? res.data.slips : [];
      setSlips(data);
    } catch (err) {
      toast.error("Failed to load salary slips");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!userloading) {
      fetchSlips();
    }
  }, [userloading]);

  const handleEdit = (slip) => {
    setEditingSlip({ ...slip });
  };

  const handleEditChange = (e) => {
    setEditingSlip({ ...editingSlip, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const toNumber = (val) =>
        val !== undefined && val !== null && val !== "" ? Number(val) : 0;

      const netSalary =
        toNumber(editingSlip.basicPay) +
        toNumber(editingSlip.hra) +
        toNumber(editingSlip.allowances) -
        toNumber(editingSlip.deductions);

      const payload = {
        basicPay: editingSlip.basicPay,
        hra: editingSlip.hra,
        allowances: editingSlip.allowances,
        deductions: editingSlip.deductions,
        notes: editingSlip.notes,
        month: editingSlip.month,
        year: editingSlip.year,
        netSalary,
      };

      await axiosInstance.put(`/slips/salary-slip/${editingSlip._id}`, payload);
      toast.success("Salary slip updated");
      setEditingSlip(null);
      fetchSlips();
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md space-y-6">
      <h2 className="text-lg font-semibold text-yellow-700">
        {isAdmin ? "All Salary Slips" : "Your Salary Slips"}
      </h2>

      {isAdmin && editingSlip && (
        <form
          onSubmit={handleUpdate}
          className="bg-yellow-50 p-4 rounded-lg border border-yellow-300 space-y-3"
        >
          <h3 className="text-yellow-800 font-semibold">Update Salary Slip</h3>

          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="month"
              value={editingSlip.month}
              onChange={handleEditChange}
              required
              placeholder="e.g. March"
              className="px-3 py-2 border border-yellow-300 rounded-lg"
            />
            <input
              type="text"
              name="year"
              value={editingSlip.year}
              onChange={handleEditChange}
              required
              placeholder="e.g. 2025"
              className="px-3 py-2 border border-yellow-300 rounded-lg"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <input
              type="number"
              name="basicPay"
              value={editingSlip.basicPay}
              onChange={handleEditChange}
              required
              placeholder="Enter basic pay"
              className="px-3 py-2 border border-yellow-300 rounded-lg"
            />
            <input
              type="number"
              name="hra"
              value={editingSlip.hra}
              onChange={handleEditChange}
              placeholder="Enter HRA"
              className="px-3 py-2 border border-yellow-300 rounded-lg"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <input
              type="number"
              name="allowances"
              value={editingSlip.allowances}
              onChange={handleEditChange}
              placeholder="Enter allowances"
              className="px-3 py-2 border border-yellow-300 rounded-lg"
            />
            <input
              type="number"
              name="deductions"
              value={editingSlip.deductions}
              onChange={handleEditChange}
              placeholder="Enter deductions"
              className="px-3 py-2 border border-yellow-300 rounded-lg"
            />
          </div>

          <textarea
            name="notes"
            value={editingSlip.notes}
            onChange={handleEditChange}
            rows={2}
            placeholder="Optional notes or remarks"
            className="w-full px-3 py-2 border border-yellow-300 rounded-lg resize-none"
          />

          <button
            type="submit"
            className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
          >
            Save Changes
          </button>
        </form>
      )}

      <table className="w-full text-sm">
        <thead className="bg-yellow-100 text-yellow-800">
          <tr>
            <th className="text-left px-4 py-2">Month</th>
            <th className="text-left px-4 py-2">Year</th>
            <th className="text-left px-4 py-2">Net Pay</th>
            {isAdmin ? (
              <th className="text-left px-4 py-2">Actions</th>
            ) : (
              <th className="text-left px-4 py-2">Issued By</th>
            )}
          </tr>
        </thead>
        <tbody>
          {Array.isArray(slips) && slips.length > 0 ? (
            slips.map((slip, idx) => (
              <tr key={idx} className="border-t">
                <td className="px-4 py-2">{slip.month}</td>
                <td className="px-4 py-2">{slip.year}</td>
                <td className="px-4 py-2">₹{slip.netSalary}</td>
                {isAdmin ? (
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleEdit(slip)}
                      className="text-yellow-600 hover:underline text-sm"
                    >
                      Edit
                    </button>
                  </td>
                ) : (
                  <td className="px-4 py-2 text-xs text-gray-500">
                    {slip.adminId?.fullName || "—"}
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center py-4 text-yellow-600">
                No salary slips found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SalarySlips;
