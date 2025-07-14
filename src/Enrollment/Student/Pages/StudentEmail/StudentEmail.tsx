import React, { useState, useCallback } from "react";
import { Student } from "../../studentData/studentTypes";

type Props = {
  student: Student;
};

const StudentEmail: React.FC<Props> = ({ student }) => {
  const [content, setContent] = useState("");

  const handleComposeEmail = useCallback(() => {
    if (!content.trim()) {
      alert("Please enter email content before composing.");
      return;
    }

    const subject = encodeURIComponent(`Message for ${student.name}`);
    const body = encodeURIComponent(content);

    window.location.href = `mailto:${student.email.toString()}?subject=${subject}&body=${body}`;
  }, [content, student]);

  if (!student) {
    return <div className="p-6 text-red-600">Student not found.</div>;
  }

  return (
    <div className="p-6">
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center gap-4 mb-6">
          <img
            src={student.imageUrl}
            alt={`Profile picture of ${student.name}`}
            className="w-24 h-24 rounded-full"
          />
          <div>
            <h2 className="text-2xl font-bold">{student.name}</h2>
            <p className="text-gray-600">{student.email.toString()}</p>
          </div>
        </div>

        <h3 className="text-lg font-semibold mb-2">Notes</h3>
        <p className="text-gray-700 mb-4">{student.notes}</p>

        <h3 className="text-lg font-semibold mb-2">Email Content</h3>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={6}
          className="w-full border rounded p-3 mb-4 text-sm"
          placeholder="Write your message here..."
        />

        <button
          onClick={handleComposeEmail}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Compose Email
        </button>
      </div>
    </div>
  );
};

export default StudentEmail;