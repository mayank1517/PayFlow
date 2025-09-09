import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 min-w-64 bg-white border-r border-yellow-200">
        <Sidebar />
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-6 bg-yellow-50">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
