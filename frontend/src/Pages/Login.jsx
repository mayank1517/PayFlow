import { useState } from "react";
import login from "../assets/login.png";
import axiosInstance from "../lib/axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axiosInstance.post(
        "auth/login",
        { email, password },
        { withCredentials: true }
      );
      toast.success("Login successful");
      window.location.reload();
      console.log("Login successful:", response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
      toast.error(err.response?.data?.message);
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
            Welcome Back 👋
          </h2>
          <p className="text-sm text-yellow-700">
            Securely access your dashboard and manage payroll with confidence.
          </p>
          <img src={login} alt="Login Illustration" className="w-[20rem]" />
        </div>

        {/* Right Side - Login Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-xl p-8 space-y-6 flex flex-col justify-center"
        >
          <h3 className="text-xl font-semibold text-yellow-700 text-center">
            Login to PayFlow
          </h3>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="px-4 py-2 border border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="px-4 py-2 border border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />

          {error && <p className="text-sm text-red-500 text-center">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 bg-yellow-500 text-white font-semibold rounded-lg transition ${
              loading ? "opacity-50 cursor-not-allowed" : "hover:bg-yellow-600"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="text-xs text-center text-yellow-600">
            Don't have an account ?{" "}
            <Link to="/signup">
              <span className="text-gray-500 hover:underline cursor-pointer">
                Create One
              </span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
