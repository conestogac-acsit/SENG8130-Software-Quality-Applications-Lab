import React, { useRef, useState } from "react";

interface UploadEvaluationCsvProps {
  onUpload: (file: File) => void;
}

const UploadEvaluationCsv: React.FC<UploadEvaluationCsvProps> = ({ onUpload }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSelectFile = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;

    if (file) {
      if (!file.name.toLowerCase().endsWith(".csv")) {
        setErrorMessage("File must be a CSV.");
        setSelectedFile(null);
      } else {
        setSelectedFile(file);
        setErrorMessage(null);
      }
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      onUpload(selectedFile);
      setErrorMessage(null);
    }
  };

  return (
    <div className="csv-upload-container">

      <button type="button" onClick={handleSelectFile}>
        Select CSV File
      </button>
      <input
        type="file"
        accept=".csv"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
      />  
      <input
        type="text"
        readOnly
        value={selectedFile ? selectedFile.name : ""}
        placeholder="No file selected"
      />   
      {selectedFile && (
        <button type="button" onClick={handleUpload}>
          Upload
        </button>
      )}
      {errorMessage && (
        <p style={{ color: "red", marginTop: "8px" }}>{errorMessage}</p>
      )}
    </div>
  );
};

export default UploadEvaluationCsv;