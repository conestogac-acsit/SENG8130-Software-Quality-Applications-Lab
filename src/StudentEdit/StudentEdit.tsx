import React from "react";
import { useParams } from "react-router-dom";

const StudentEmail = () => {
  const { id } = useParams();

  const handleSendEmail = () => {
    const confirmed = window.confirm("Do you want to send the email?");
    if (confirmed) {
      alert("Email sent successfully.");
    }
  };

  return (
    <div className="p-6 overflow-auto">
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center space-x-6">
          <img
            src="https://via.placeholder.com/100"
            alt="Profile"
            className="w-24 h-24 rounded-full"
          />
          <div>
            <h2 className="text-2xl font-bold">Yash Ketanbhai Shah</h2>
            <p className="text-sm text-gray-500">Student ID: {id}</p>
            <p className="text-sm text-gray-500">Email: yash.shah@example.com</p>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Email Message</h3>
          <textarea
            defaultValue="Dear student, just a reminder to complete Milestone #1 by the end of this week."
            rows={6}
            className="w-full border rounded p-3 text-sm"
          />
          <div className="mt-4 text-right">
            <button
              onClick={handleSendEmail}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              Send Email
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentEmail;
