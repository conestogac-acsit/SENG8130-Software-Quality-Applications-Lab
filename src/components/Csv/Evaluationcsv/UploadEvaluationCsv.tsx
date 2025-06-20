import React, { useRef, useState, useCallback } from "react";
import Button from "../../Button/Button";

const UploadEvaluationCsv: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSelectFile = useCallback(() => {
    fileInputRef.current?.click();
  }, []);
  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
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
    },
    []
  )
  const handleUpload = useCallback(() => {
    if (selectedFile) {
      console.log("Uploading file:", selectedFile);
      setErrorMessage(null);
    } else {
      setErrorMessage("Please select a CSV file first.");
    }
  }, [selectedFile]);
  return (
    <div>
       <Button onClick={handleSelectFile} label="Select CSV File" />
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
        <Button onClick={handleUpload} label="Upload" />
      )}
      {errorMessage && (
        <p style={{ color: "red", marginTop: "8px" }}>{errorMessage}</p>
      )}
    </div>
  );
};

export default UploadEvaluationCsv;
