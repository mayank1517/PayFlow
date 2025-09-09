import { useState } from "react";
import signup from "../assets/login.png";
import axiosInstance from "../lib/axios";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
  const [form, setForm] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    role: "employee",
    designation: "",
    department: "",
    salary: "",
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await axiosInstance.post("/auth/signup", {
        ...form,
        salary: Number(form.salary) || 0,
      });
      toast.success("Account created successfully");
      setForm({
        fullName: "",
        username: "",
        email: "",
        password: "",
        role: "employee",
        designation: "",
        department: "",
        salary: "",
      });
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
      toast.error(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-yellow-50">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 max-w-5xl w-full">
        {/* Left Side */}
        <div className="flex flex-col items-center justify-center text-center space-y-6">
          <h2 className="text-3xl font-bold text-yellow-800">
            Create Your Account ✨
          </h2>
          <p className="text-sm text-yellow-700">
            Join PayFlow and simplify your payroll management with ease.
          </p>
          <img src={signup} alt="Signup Illustration" className="w-[20rem]" />
        </div>

        {/* Right Side - Signup Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-xl p-8 space-y-6 flex flex-col justify-center"
        >
          <h3 className="text-xl font-semibold text-yellow-700 text-center">
            Sign Up for PayFlow
          </h3>

          {/* Required Fields */}
          {[
            { label: "Full Name", name: "fullName", type: "text" },
            { label: "Username", name: "username", type: "text" },
            { label: "Email", name: "email", type: "email" },
            { label: "Password", name: "password", type: "password" },
          ].map(({ label, name, type }) => (
            <div key={name}>
              <label className="block text-sm font-medium text-yellow-800">
                {label} <span className="text-red-500">*</span>
              </label>
              <input
                type={type}
                name={name}
                value={form[name]}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>
          ))}

          {/* Role Selection */}
          <div>
            <label className="block text-sm font-medium text-yellow-800">
              Role <span className="text-red-500">*</span>
            </label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            >
              <option value="employee">Employee</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* Optional Fields */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-yellow-800">
                Designation <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="designation"
                value={form.designation}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-yellow-800">
                Department
              </label>
              <input
                type="text"
                name="department"
                value={form.department}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-yellow-300 rounded-lg"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-yellow-800">
              Salary
            </label>
            <input
              type="number"
              name="salary"
              value={form.salary}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-yellow-300 rounded-lg"
            />
          </div>

          {error && <p className="text-sm text-red-500 text-center">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 bg-yellow-500 text-white font-semibold rounded-lg transition ${
              loading ? "opacity-50 cursor-not-allowed" : "hover:bg-yellow-600"
            }`}
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>

          <p className="text-xs text-center text-yellow-600">
            Already have an account?{" "}
            <Link to="/">
              <span className="text-gray-500 hover:underline cursor-pointer">
                Login
              </span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
