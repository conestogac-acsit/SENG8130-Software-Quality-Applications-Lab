import React, { useState } from 'react';
import UploadStudentCsv from './components/studentUpload.csv/UploadStudentsCsv';

type Student = {
  Name: string;
  ID: string;
  Email: string;
  Section: string;
  Document: string;
  GitHubEnrolled: string;
  LoopEnrolled: string;
};

const App: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);

  const handleUpload = (data: Student[]) => {
    setStudents(data);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">Student Information</h1>

      <UploadStudentCsv onUpload={handleUpload} />

      {students.length > 0 && (
        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">ID</th>
                <th className="px-4 py-2 border">Email</th>
                <th className="px-4 py-2 border">Section</th>
                <th className="px-4 py-2 border">Document</th>
                <th className="px-4 py-2 border">GitHub Enrolled</th>
                <th className="px-4 py-2 border">Loop Enrolled</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <tr key={index} className="border-t">
                  <td className="px-4 py-2 border">{student.Name}</td>
                  <td className="px-4 py-2 border">{student.ID}</td>
                  <td className="px-4 py-2 border">{student.Email}</td>
                  <td className="px-4 py-2 border">{student.Section}</td>
                  <td className="px-4 py-2 border">{student.Document}</td>
                  <td className="px-4 py-2 border">{student.GitHubEnrolled}</td>
                  <td className="px-4 py-2 border">{student.LoopEnrolled}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default App;
