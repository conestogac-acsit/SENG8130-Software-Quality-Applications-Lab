import React, { useState } from "react";
import EnrollmentForm from "../Student/Pages/EnrollmentForm";

const Dashboard: React.FC = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Welcome to the Dashboard!</h1>
      <p className="text-gray-700 mb-2">
        You can check enrollment of all your students here.
      </p>

      {!showForm && (
        <p className="text-gray-700 mb-2">
          <span
            onClick={() => setShowForm(true)}
            className="text-blue-600 font-medium hover:underline cursor-pointer"
          >
            upload
          </span>{" "}
          first.
        </p>
      )}

      {showForm && <EnrollmentForm onEnroll={() => setShowForm(false)} />}

      <p className="text-gray-700 mb-2">
        Back to{" "}
        <span
          className="text-blue-600 font-medium hover:underline cursor-pointer"
          onClick={() => setShowForm(false)}
        >
          home page
        </span>
      </p>
    </div>
  );
};

export default Dashboard;
