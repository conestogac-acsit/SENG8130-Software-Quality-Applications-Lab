import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { findStudentById } from "../../studentData/findStudentById";
import { Student } from "../../studentData";

const STUDENT_DATA_STORAGE_KEY = "students_list_key";

const getAllStudents = () => {
  const studentDataFromCache = localStorage.getItem(STUDENT_DATA_STORAGE_KEY);
  if (!studentDataFromCache) return;
  return JSON.parse(studentDataFromCache);
};

const StudentDetailsByID: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [studentDetails, setStudentDetails] = useState<Student>();
  const [loadingState, setLoadingState] = useState<boolean>(true);

  useEffect(() => {
    if (!id) return;
    const student = findStudentById(id, getAllStudents);
    setLoadingState(false);
    setStudentDetails(student);
  }, [id]);

  if (!id) {
    return (
      <h3 className="p-8 text-red-600 text-lg">
        No student ID provided in URL.
      </h3>
    );
  }

  if (loadingState) {
    return <h3 className="text-center">Loading Student Details...</h3>;
  }

  if (!studentDetails) {
    return <h3 className="p-8 text-red-600 text-lg">Student not found</h3>;
  }

  return (
    <div className="mt-2 ml-3 p-8 max-w-xl mx-auto bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Student Details</h2>
      <div className="space-y-2 text-gray-700">
        <p>
          <span className="font-semibold">Name:</span> {studentDetails.name}
        </p>
        <p>
          <span className="font-semibold">Email:</span>{" "}
          {studentDetails.email.toString()}
        </p>
        <p>
          <span className="font-semibold">Group:</span> {studentDetails.group}
        </p>
        <p>
          <span className="font-semibold">Notes:</span> {studentDetails.notes}
        </p>
      </div>
    </div>
  );
};

export default StudentDetailsByID;