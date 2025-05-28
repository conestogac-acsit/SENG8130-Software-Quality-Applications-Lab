import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Users, Layers } from "lucide-react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside
        className={`bg-white shadow-md transition-all duration-300 ease-in-out transform ${
          sidebarOpen ? "w-64" : "w-0 -translate-x-full"
        } md:block hidden`}
      >
        <div className="p-6 font-bold text-lg border-b whitespace-nowrap">
          Student Portal
        </div>
        <nav className="p-6 space-y-4">
          <>
            <Link
              to="/dashboard"
              className={`flex items-center gap-2 hover:text-blue-600 ${
                isActive("/dashboard") ? "text-blue-600 font-semibold" : ""
              }`}
            >
              <LayoutDashboard className="w-5 h-5" /> Dashboard
            </Link>

            <Link
              to="/sections"
              className={`flex items-center gap-2 hover:text-blue-600 ${
                isActive("/sections") ? "text-blue-600 font-semibold" : ""
              }`}
            >
              <Layers className="w-5 h-5" /> Section List
            </Link>

            {/* Student List link hidden but valid */}
            {false && (
              <Link
                to="/students"
                className={`flex items-center gap-2 hover:text-blue-600 ${
                  isActive("/students") ? "text-blue-600 font-semibold" : ""
                }`}
              >
                <Users className="w-5 h-5" /> Student List
              </Link>
            )}
          </>
        </nav>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-gray-100 shadow p-4 flex justify-between items-center">
          <button
            className="text-2xl font-bold md:hidden"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            ☰
          </button>
          <span className="text-sm text-gray-600 ml-auto">Welcome, Admin</span>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6 bg-gray-50">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
