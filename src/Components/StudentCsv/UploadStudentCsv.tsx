import React from 'react';

interface UploadStudentCsvProps {
  onUpload: (file: File) => void;
}

const UploadStudentCsv: React.FC<UploadStudentCsvProps> = ({ onUpload }) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onUpload(file); // Pass file to parent handler
    }
  };

  return (
    <div className="csv-upload-container">
      <label htmlFor="student-csv-upload" className="csv-upload-label">
        Upload Student CSV
      </label>
      <input
        id="student-csv-upload"
        type="file"
        accept=".csv"
        onChange={handleFileChange}
        className="csv-upload-input"
      />
    </div>
  );
};

export default UploadStudentCsv;