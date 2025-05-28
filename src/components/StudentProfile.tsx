import React from "react";
import { Link, useParams } from "react-router-dom";

const StudentProfile = () => {
  const { id } = useParams();

  const confirmAction = (actionType: "delete" | "email") => {
    const message =
      actionType === "delete"
        ? "Are you sure you want to delete this student?"
        : "Email sent successfully!";
    const confirmed = window.confirm(message);
    if (confirmed && actionType === "delete") {
      alert("Student deleted successfully.");
    } else if (actionType === "email") {
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
          <div className="ml-auto space-x-2">
            <Link
              to={`/edit/${id}`}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Edit Grades
            </Link>
            <Link
              to={`/email/${id}`}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Send Email
            </Link>
            <button
              onClick={() => confirmAction("delete")}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Delete Student
            </button>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Grades Summary</h3>
          <table className="w-full text-left bg-gray-50 rounded">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2">Subject</th>
                <th className="px-4 py-2">Weight Achieved</th>
                <th className="px-4 py-2">Grade</th>
                <th className="px-4 py-2">Comments</th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  subject: "Planning & Validation",
                  weight: "8 / 10",
                  grade: "80%",
                  comment: "More breakdowns needed. Overall good direction.",
                },
                {
                  subject: "Milestone #1",
                  weight: "0 / 20",
                  grade: "0%",
                  comment: "Pending submission.",
                },
                {
                  subject: "Presentation & Pitch",
                  weight: "9 / 10",
                  grade: "90%",
                  comment: "Excellent delivery and communication.",
                },
                {
                  subject: "Team Collaboration",
                  weight: "7.5 / 10",
                  grade: "75%",
                  comment: "Consistent participation. Good support to peers.",
                },
                {
                  subject: "Final Project Delivery",
                  weight: "18 / 20",
                  grade: "90%",
                  comment: "Completed with high accuracy and on time.",
                },
              ].map((item, idx) => (
                <tr key={idx} className="border-t">
                  <td className="px-4 py-2">{item.subject}</td>
                  <td className="px-4 py-2">{item.weight}</td>
                  <td className="px-4 py-2">{item.grade}</td>
                  <td className="px-4 py-2">{item.comment}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-2">Additional Notes</h3>
          <p className="text-gray-700 text-sm">
            Student has shown good leadership qualities and is actively
            participating in project discussions. Needs to complete pending
            milestones to improve overall grade.
          </p>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
