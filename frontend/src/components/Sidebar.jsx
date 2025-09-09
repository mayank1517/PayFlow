import { NavLink } from "react-router-dom";
import { useState } from "react";
import { FiMenu } from "react-icons/fi";
import useLogout from "../hooks/useLogout";
import useAuth from "../hooks/useAuth";

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const logout = useLogout();
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";

  return (
    <>
      {/* Top Navbar for Mobile */}
      <div className="lg:hidden bg-yellow-100 px-4 py-3 shadow-md flex items-center justify-between">
        <h2 className="text-xl font-bold text-yellow-800">PayFlow</h2>
        <button
          onClick={() => setOpen(!open)}
          className="text-yellow-700 text-2xl"
          aria-label="Toggle menu"
        >
          <FiMenu />
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {open && (
        <div className="lg:hidden bg-yellow-50 shadow-md px-4 py-2 space-y-2 absolute w-full z-50">
          <NavLink
            to="/"
            onClick={() => setOpen(false)}
            className="block text-yellow-700 hover:bg-yellow-200 px-4 py-2 rounded"
          >
            Dashboard
          </NavLink>
          {isAdmin && (
            <NavLink
              to="/employees"
              onClick={() => setOpen(false)}
              className="block text-yellow-700 hover:bg-yellow-200 px-4 py-2 rounded"
            >
              Employees
            </NavLink>
          )}
          <NavLink
            to="/fetch-expenses"
            onClick={() => setOpen(false)}
            className="block text-yellow-700 hover:bg-yellow-200 px-4 py-2 rounded"
          >
            All Expenses
          </NavLink>
          <button
            onClick={logout}
            className="block text-red-600 hover:bg-red-100 px-4 py-2 rounded text-left w-full"
          >
            Logout
          </button>
        </div>
      )}

      {/* Sidebar for Desktop */}
      <div className="hidden lg:flex lg:flex-col lg:w-64 lg:h-screen lg:bg-yellow-100 lg:p-6 lg:shadow-md lg:justify-between">
        <div>
          <h2 className="text-xl font-bold text-yellow-800 mb-6">PayFlow</h2>
          <nav className="space-y-4">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `block px-4 py-2 rounded-lg ${
                  isActive
                    ? "bg-yellow-300 text-yellow-900 font-semibold"
                    : "text-yellow-700 hover:bg-yellow-200"
                }`
              }
            >
              Dashboard
            </NavLink>
            {isAdmin && (
              <NavLink
                to="/employees"
                className={({ isActive }) =>
                  `block px-4 py-2 rounded-lg ${
                    isActive
                      ? "bg-yellow-300 text-yellow-900 font-semibold"
                      : "text-yellow-700 hover:bg-yellow-200"
                  }`
                }
              >
                Employees
              </NavLink>
            )}
            <NavLink
              to="/fetch-expenses"
              className={({ isActive }) =>
                `block px-4 py-2 rounded-lg ${
                  isActive
                    ? "bg-yellow-300 text-yellow-900 font-semibold"
                    : "text-yellow-700 hover:bg-yellow-200"
                }`
              }
            >
              All Expenses
            </NavLink>
          </nav>
        </div>
        <button
          onClick={logout}
          className="mt-6 px-4 py-2 rounded-lg text-red-600 hover:bg-red-100 transition text-left"
        >
          Logout
        </button>
      </div>
    </>
  );
};

export default Sidebar;
