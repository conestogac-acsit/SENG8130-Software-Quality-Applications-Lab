import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const goToEnrollment = () => {
    console.log("Navigated to /student/enroll");
    navigate("/student/enroll");
  };

  const goToHome = () => {
    console.log("Navigated to /");
    navigate("/");
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Welcome to the Dashboard!</h1>
      <p className="text-gray-700 mb-2">
        You can check enrollment of all your students here.
      </p>
      <p className="text-gray-700 mb-2">
        <span
          onClick={goToEnrollment}
          className="text-blue-600 font-medium hover:underline cursor-pointer"
        >
          upload
        </span>{" "}
        first.
      </p>
      <p className="text-gray-700 mb-2">
        Back to{" "}
        <span
          onClick={goToHome}
          className="text-blue-600 font-medium hover:underline cursor-pointer"
        >
          home page
        </span>
      </p>
    </div>
  );
};

export default Dashboard;
