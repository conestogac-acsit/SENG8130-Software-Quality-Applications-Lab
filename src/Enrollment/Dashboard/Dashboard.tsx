import React from "react";
import { Link } from "react-router-dom";

const Dashboard: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Welcome to the Dashboard!</h1>
      <p className="text-gray-700 mb-2">
        You can check enrollment of all your students here.
      </p>
      <p className="text-gray-700 mb-2">
        If there's no data, please <span className="text-gray-500 font-medium">upload</span> first.
        {/* The Link will be re-added once /upload-student is implemented */}
      </p>

      <p className="text-gray-700 mb-2">
        back to{" "}
        <Link to={`/`} className="text-blue-600 font-medium hover:underline">
          home page
        </Link>
      </p>
    </div>
  );
};

export default Dashboard;