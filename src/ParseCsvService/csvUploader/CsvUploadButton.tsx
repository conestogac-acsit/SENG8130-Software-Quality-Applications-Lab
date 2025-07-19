import React, { useRef, useState, useCallback } from "react";
import { parseCsv } from "../ParseCsv";

interface CsvUploadButtonProps<T> {
  parseType: "Student" | "Evaluation";
  onDataParsed: (data: T[]) => void;
  label?: string;
}

const CsvUploadButton = <T,>({ parseType, onDataParsed, label = "Upload CSV" }: CsvUploadButtonProps<T>) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSelectFile = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0] || null;
      setErrorMessage(null);
      if (file) {
        if (!file.name.toLowerCase().endsWith(".csv")) {
          setErrorMessage("File must be a CSV.");
          setSelectedFile(null);
        } else {
          setSelectedFile(file);
        }
      }
    },
    []
  );

  const handleUpload = useCallback(async () => {
    setErrorMessage(null);
    if (selectedFile) {
      try {
        const data = await parseCsv<T>(selectedFile, parseType);
        onDataParsed(data);
      } catch (err) {
        setErrorMessage("CSV Parse Error: " + err);
      }
    } else {
      setErrorMessage("Please select a CSV file first.");
    }
  }, [selectedFile, parseType, onDataParsed]);

  return (
    <div>
      <button onClick={handleSelectFile}>{label}</button>
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
        style={{ marginTop: 8, width: "100%" }}
      />
      {selectedFile && (
        <button onClick={handleUpload} style={{ marginTop: 8 }}>
          {label}
        </button>
      )}
      {errorMessage && (
        <p style={{ color: "red", marginTop: 8 }}>{errorMessage}</p>
      )}
    </div>
  );
};

export default CsvUploadButton; 