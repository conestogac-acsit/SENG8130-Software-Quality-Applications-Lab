import React, { useState } from 'react';
import Papa from 'papaparse';
import { validateStudentCsv, ValidationError } from '../utils/validateStudentCsv';


type Student = {
  Name: string;
  ID: string;
  Email: string;
  Section: string;
  Document: string;
  GitHubEnrolled: string;
  LoopEnrolled: string;
};

interface Props {
  onUpload: (data: Student[]) => void;
}

const UploadStudentCsv: React.FC<Props> = ({ onUpload }) => {
  const [students, setStudents] = useState<Student[]>([]);
  const [errorMap, setErrorMap] = useState<Record<number, string[]>>({});

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    Papa.parse<Student>(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const data = results.data;
        const errors = validateStudentCsv(data);

        // Map errors by row index (not number)
        const rowErrorMap: Record<number, string[]> = {};
        errors.forEach((err) => {
          const index = err.row - 2; // -2 to convert row number to zero-based index
          if (!rowErrorMap[index]) rowErrorMap[index] = [];
          rowErrorMap[index].push(err.message);
        });

        setStudents(data);
        setErrorMap(rowErrorMap);

        if (Object.keys(rowErrorMap).length === 0) {
          onUpload(data); // all valid
        }
      },
      error: (error) => {
        console.error('CSV parse error:', error);
      },
    });
  };

  const handleDownloadTemplate = () => {
    const csvContent = [
      ['Name', 'ID', 'Email', 'Section', 'Document', 'GitHubEnrolled', 'LoopEnrolled'],
      ['John Doe', '12345', 'john@example.com', 'A1', 'Uploaded', 'Yes', 'Yes']
    ].map(e => e.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'student_template.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Upload Student CSV
      </label>
      <input
        type="file"
        accept=".csv"
        onChange={handleFileChange}
        className="border p-2 rounded mb-2"
      />
      <button
        onClick={handleDownloadTemplate}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Download CSV Template
      </button>

      {students.length > 0 && (
        <table className="table-auto w-full mt-6 border">
          <thead>
            <tr>
              <th className="border px-2 py-1">Name</th>
              <th className="border px-2 py-1">ID</th>
              <th className="border px-2 py-1">Email</th>
              <th className="border px-2 py-1">Section</th>
              <th className="border px-2 py-1">Document</th>
              <th className="border px-2 py-1">GitHub Enrolled</th>
              <th className="border px-2 py-1">Loop Enrolled</th>
              <th className="border px-2 py-1">Errors</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, idx) => {
              const rowErrors = errorMap[idx] || [];
              const rowStyle = rowErrors.length > 0 ? 'bg-red-100' : 'bg-green-100';

              return (
                <tr key={idx} className={rowStyle}>
                  <td className="border px-2 py-1">{student.Name}</td>
                  <td className="border px-2 py-1">{student.ID}</td>
                  <td className="border px-2 py-1">{student.Email}</td>
                  <td className="border px-2 py-1">{student.Section}</td>
                  <td className="border px-2 py-1">{student.Document}</td>
                  <td className="border px-2 py-1">{student.GitHubEnrolled}</td>
                  <td className="border px-2 py-1">{student.LoopEnrolled}</td>
                  <td className="border px-2 py-1 text-red-600 text-sm">
                    {rowErrors.join(', ')}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UploadStudentCsv;