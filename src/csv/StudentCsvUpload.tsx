import React from 'react';
import { parseStudentCsv } from './parseStudentCsv';

interface Props {
  onUpload: (data: any[]) => void;
}

const StudentCsvUpload: React.FC<Props> = ({ onUpload }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    parseStudentCsv(file, onUpload);
  };

  return (
    <div>
      <label>Upload Student CSV:</label>
      <input type="file" accept=".csv" onChange={handleChange} />
    </div>
  );
};

export default StudentCsvUpload;