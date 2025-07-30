import React from "react";
import { useNavigate } from "react-router-dom";
import { FaRegSadTear } from "react-icons/fa";

interface Props {
  onReset: () => void;
}

const ErrorFallback: React.FC<Props> = ({ onReset }) => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    onReset();
    navigate("/"); 
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="max-w-md text-center">
        <div className="text-6xl text-blue-600 mb-4" aria-label="Error Icon">
          <FaRegSadTear aria-hidden="true" />
        </div>
        <h1 className="text-3xl font-bold text-red-600 mb-4">
          Oops! Something went wrong.
        </h1>
        <p className="text-gray-700 mb-6">
          We're sorry for the inconvenience. Please try refreshing the page or return to the homepage.
        </p>
        <button
          onClick={handleGoHome}
          className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          aria-label="Go Back Home"
        >
          Go Back Home
        </button>
      </div>
    </div>
  );
};

export default ErrorFallback;
