import React from "react";

const StudentProfileView: React.FC = () => {
  const student = {
    name: "Alice Johnson",
    email: "alice@example.com",
    github: "https://github.com/alicejohnson",
    enrollment: ["COMP1001", "COMP2022"],
    groupHistory: ["Group A", "Group B"],
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Student Profile</h2>
      <p><strong>Name:</strong> {student.name}</p>
      <p><strong>Email:</strong> {student.email}</p>
      <p><strong>GitHub:</strong> <a href={student.github} target="_blank" className="text-blue-600 hover:underline">{student.github}</a></p>
      <p><strong>Enrollment:</strong> {student.enrollment.join(", ")}</p>
      <p><strong>Group History:</strong> {student.groupHistory.join(", ")}</p>
    </div>
  );
};

export default StudentProfileView;
