import React from 'react';

interface UploadEvaluationCsvProps {
  onUpload: (file: File) => void;
}

const UploadEvaluationCsv: React.FC<UploadEvaluationCsvProps> = ({ onUpload }) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onUpload(file);
    }
  };

  return (
    <div className="csv-upload-container">
      <label htmlFor="evaluation-csv-upload" className="csv-upload-label">
        Upload Evaluation CSV
      </label>
      <input
        id="evaluation-csv-upload"
        type="file"
        accept=".csv"
        onChange={handleFileChange}
        className="csv-upload-input"
      />
    </div>
  );
};

export default UploadEvaluationCsv;
