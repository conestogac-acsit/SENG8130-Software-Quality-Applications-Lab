import React from 'react';
import Papa from 'papaparse';

type Student = {
  Name: string;
  ID: string;
  Email: string;
  Section: string;
  Document: string;
  GitHubEnrolled: string;
  LoopEnrolled: string;
}

interface Props {
  onUpload: (data: Student[]) => void;
}

const UploadStudentCsv: React.FC<Props> = ({ onUpload }) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    Papa.parse<Student>(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        onUpload(results.data);
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
      <input type="file" accept=".csv" onChange={handleFileChange} className="border p-2 rounded mb-2" />
      <button onClick={handleDownloadTemplate} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Download CSV Template
      </button>
    </div>
  );
};

export default UploadStudentCsv;
