import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Dashboard from "./Pages/Dashboard";
import Employees from "./Pages/Employee";
import Layout from "./components/Layout";
import PulseLoader from "./components/PulseLoader";
import useAuth from "./hooks/useAuth";
import { Toaster } from "react-hot-toast";
import AllExpenses from "./Pages/AllExpenses";

function App() {
  const { user, loading } = useAuth();

  if (loading) return <PulseLoader />;

  return (
    <>
      <Toaster />
      <Routes>
        {/* Public Routes */}
        {!user && (
          <>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </>
        )}

        {/* Protected Routes */}
        {user && (
          <Route element={<Layout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/employees" element={<Employees />} />
            <Route path="/fetch-expenses" element={<AllExpenses />} />
            {/* Optional: Redirect unknown routes */}
            <Route path="*" element={<Navigate to="/" />} />
          </Route>
        )}
      </Routes>
    </>
  );
}

export default App;
