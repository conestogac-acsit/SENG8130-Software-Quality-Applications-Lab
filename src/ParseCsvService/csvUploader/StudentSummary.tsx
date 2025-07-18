import React from "react";
import { Student } from "../ParseCsv";
interface StudentSummaryProps {
  students: Student[];
}

const StudentSummary: React.FC<StudentSummaryProps> = ({ students }) => (
  <div>
    <h3>Student Summary</h3>
    {students.length === 0 ? (
      <div>No students uploaded yet.</div>
    ) : (
      <ul>
        {students.map((s, i) => (
          <li key={i}>{s.name} ({s.email})</li>
        ))}
      </ul>
    )}
  </div>
);

export default StudentSummary; 