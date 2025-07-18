import React, { useState } from "react";
import UploadStudentCsv from "./UploadStudentCsv";
import { Student } from "../ParseCsv";
import StudentSummary from "./StudentSummary";

const CsvUploadDemo: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);

  return (
    <div>
      <h2>CSV Upload Demo</h2>
      <UploadStudentCsv onStudentsParsed={setStudents} />
      <StudentSummary students={students} />
    </div>
  );
};

export default CsvUploadDemo; 