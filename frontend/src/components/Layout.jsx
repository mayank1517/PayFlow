import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="min-h-screen lg:flex relative">
      {/* Sidebar */}
      <div className="lg:fixed lg:h-screen lg:w-64 lg:z-10">
        <Sidebar />
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-6 bg-yellow-50 lg:ml-64">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
