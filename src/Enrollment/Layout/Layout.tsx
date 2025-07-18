import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { LayoutDashboard } from "lucide-react";

const Layout: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { label: "Dashboard", icon: LayoutDashboard },
  ];

  return (
    <div className="flex h-screen overflow-hidden">
      <aside
        className="fixed top-0 left-0 h-full bg-white shadow-md z-50 transform transition-transform duration-300 ease-in-out
        -translate-x-full md:translate-x-0 md:static md:w-64"
      >
        <div className="p-6 font-bold text-lg border-b">Student Portal</div>
        <nav className="p-6 space-y-4">
          {navItems.map(({ label, icon: Icon }, index) => (
            <div
              key={index}
              className="flex items-center gap-2 text-gray-400 cursor-not-allowed"
              title={`${label} (coming soon)`}
            >
              <Icon className="w-5 h-5" />
              {label}
            </div>
          ))}
        </nav>
      </aside>

      <div className="flex-1 flex flex-col md:ml-64">
        <div className="flex-1 overflow-auto p-6 bg-gray-50">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;