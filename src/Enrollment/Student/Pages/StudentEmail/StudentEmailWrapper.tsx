import React from "react";
import { useParams } from "react-router-dom";
import { findStudentById } from "../../studentData/findStudentById";
import { Student } from "../../studentData/studentTypes";
import StudentEmail from "./StudentEmail";
type Props = {
  studentGetter: () => Student[];
};

const StudentEmailWrapper: React.FC<Props> = ({ studentGetter }) => {
  const { id } = useParams<{ id: string }>();
  if (!id) {
    return (
      <div style={{ padding: "2rem", color: "red" }}>
        No student ID provided in URL.
      </div>
    );
  }

  let student;
  try {
    student = findStudentById(id, studentGetter);
  } catch (err) {
    return (
      <div style={{ padding: "2rem", color: "red" }}>
        Error: {(err as Error).message}
      </div>
    );
  }
  if (!student) {
    return (
      <div style={{ padding: "2rem", color: "red" }}>
        Student not found for ID = {id}
      </div>
    );
  }
  return <StudentEmail student={student} />;
};
export default StudentEmailWrapper;