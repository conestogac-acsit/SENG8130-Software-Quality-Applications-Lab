import React, { useState } from "react";
import { Link } from "react-router-dom";
import UploadStudentModal from "../../UploadStudentModal/UploadStudentModal";

const Dashboard: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Welcome to the Dashboard!</h1>
      <p className="text-gray-700 mb-2">
        You can check enrollment of all your students here.
      </p>
      <p className="text-gray-700 mb-2">
        If there's no data, please{" "}
        <button
          onClick={() => setModalOpen(true)}
          className="text-blue-600 font-medium hover:underline"
        >
          upload
        </button>{" "}
        first.
      </p>
      <p className="text-gray-700 mb-2">
        back to <Link to={`/`} className="text-blue-600 font-medium hover:underline">
          home page
        </Link>
      </p>

      <UploadStudentModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
};

export default Dashboard;
