import { NavLink, useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { FiMenu } from "react-icons/fi";
import useLogout from "../hooks/useLogout";
import useAuth from "../hooks/useAuth";

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const logout = useLogout();
  const { user } = useAuth();
  const navigate = useNavigate();
  const isAdmin = user?.role === "admin";

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden flex items-center justify-between bg-yellow-100 px-4 py-3 shadow-md">
        <h2 className="text-xl font-bold text-yellow-800">PayFlow</h2>
        <button
          onClick={() => setOpen(!open)}
          className="text-yellow-700 text-2xl"
          aria-label="Toggle sidebar"
        >
          <FiMenu />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed lg:static top-0 left-0 h-screen w-64 bg-yellow-100 p-6 shadow-md z-40 flex flex-col justify-between transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div>
          <h2 className="text-xl font-bold text-yellow-800 mb-6 hidden lg:block">
            PayFlow
          </h2>
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

        {/* Logout Button */}
        <Link to={"/"}>
          <button
            onClick={logout}
            className="mt-6 px-4 py-2 rounded-lg text-red-600 hover:bg-red-100 transition text-left"
          >
            Logout
          </button>
        </Link>
      </div>

      {/* Overlay for mobile */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-30 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
