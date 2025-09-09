// hooks/useLogout.js
import axiosInstance from "../lib/axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const useLogout = () => {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await axiosInstance.post("/auth/logout"); // optional
      toast.success("Logged out");
      window.location.reload();
      navigate("/");
    } catch (err) {
      toast.error("Logout failed");
    }
  };

  return logout;
};

export default useLogout;
