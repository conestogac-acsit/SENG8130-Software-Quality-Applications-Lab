import React, { useState } from "react";
import { Link, useLocation, Outlet } from "react-router-dom";
import { LayoutDashboard, Users } from "lucide-react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/students", label: "Student List", icon: Users },
  ];

  return (
    <div className="flex h-screen">
      <aside
        className={`bg-white shadow-md transition-all duration-300 ease-in-out transform ${
          sidebarOpen ? "w-64" : "w-0 -translate-x-full"
        } md:block hidden`}
      >
        <div className="p-6 font-bold text-lg border-b whitespace-nowrap">
          Student Portal
        </div>
        <nav className="p-6 space-y-4">
          {navItems.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`block hover:text-blue-600 ${
                isActive(to) ? "text-blue-600 font-semibold" : ""
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>
      </aside>

      <div className="flex-1 flex flex-col">
        <header className="bg-gray-100 shadow p-4 flex justify-between items-center">
          <button
            aria-label="Toggle Sidebar"
            className="text-2xl font-bold md:hidden"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            ☰
          </button>
          <span className="text-sm text-gray-600 ml-auto">Welcome, Admin</span>
        </header>

        <div className="flex-1 overflow-auto p-6 bg-gray-50">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
