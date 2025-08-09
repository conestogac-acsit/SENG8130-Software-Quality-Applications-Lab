import React from "react";
import { Link, NavLink } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <header className="bg-blue-600 text-white">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        <Link to="/" className="text-xl font-bold">SQATE</Link>
        <div className="space-x-4">
          <NavLink to="/" className={({ isActive }) => isActive ? "underline" : ""}>Home</NavLink>
          <NavLink to="/enrollment" className={({ isActive }) => isActive ? "underline" : ""}>Enrollment</NavLink>
          <NavLink to="/evaluation" className={({ isActive }) => isActive ? "underline" : ""}>Evaluation</NavLink>
        </div>
      </nav>
    </header>
  );
};

export default Header;
