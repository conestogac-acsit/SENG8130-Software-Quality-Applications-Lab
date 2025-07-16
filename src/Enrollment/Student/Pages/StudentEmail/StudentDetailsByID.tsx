import React from "react";
import { useParams } from "react-router-dom";
import { findStudentById } from "../../studentData/findStudentById";
import { Student } from "../../studentData/studentTypes";

type Props = {
  studentGetter: () => Student[];
};

const StudentDetailsByID: React.FC<Props> = ({ studentGetter }) => {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return (
      <div className="p-8 text-red-600 text-lg">
        No student ID provided in URL.
      </div>
    );
  }

  let student;
  try {
    student = findStudentById(id, studentGetter);
  } catch (err) {
    return (
      <div className="p-8 text-red-600 text-lg">
        Error: {(err as Error).message}
      </div>
    );
  }

  if (!student) {
    return (
      <div className="p-8 text-red-600 text-lg">
        Student not found for ID = {id}
      </div>
    );
  }

  return (
    <div className="p-8 max-w-xl mx-auto bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Student Details</h2>
      <div className="space-y-2 text-gray-700">
        <p>
          <span className="font-semibold">Name:</span> {student.name}
        </p>
        <p>
          <span className="font-semibold">Email:</span> {student.email.toString()}
        </p>
        <p>
          <span className="font-semibold">Group:</span> {student.group}
        </p>
        <p>
          <span className="font-semibold">Notes:</span> {student.notes}
        </p>
      </div>
    </div>
  );
};

export default StudentDetailsByID;