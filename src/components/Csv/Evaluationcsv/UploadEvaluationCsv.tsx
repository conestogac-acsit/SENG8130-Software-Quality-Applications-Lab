import React, { useState } from "react";

interface UploadEvaluationCsvProps {
  onUpload: (file: File) => void;
}

const UploadEvaluationCsv: React.FC<UploadEvaluationCsvProps> = ({ onUpload }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSelectedFile(file);
  };

  const handleUploadClick = () => {
    if (selectedFile) {
      onUpload(selectedFile);
    } else {
      alert("Please select a CSV file first.");
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
      {selectedFile && (
        <p className="selected-file-name">Selected: {selectedFile.name}</p>
      )}
      <button onClick={handleUploadClick}>Upload</button>
    </div>
  );
};

export default UploadEvaluationCsv;
