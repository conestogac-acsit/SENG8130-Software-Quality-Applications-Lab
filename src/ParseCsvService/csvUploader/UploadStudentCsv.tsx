import React, { useRef, useState, useCallback } from "react";
import { parseCsv, Student } from "../ParseCsv";

const UploadStudentCsv: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [students, setStudents] = useState<Student[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSelectFile = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0] || null;
      setStudents([]);
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
    setStudents([]);
    setErrorMessage(null);
    if (selectedFile) {
      try {
        const data = await parseCsv<Student>(selectedFile, "Student");
        setStudents(data);
      } catch (err) {
        setErrorMessage("CSV Parse Error: " + err);
      }
    } else {
      setErrorMessage("Please select a CSV file first.");
    }
  }, [selectedFile]);

  return (
    <div>
      <button onClick={handleSelectFile}>Select Student CSV</button>
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
          Upload Student CSV
        </button>
      )}
      {errorMessage && (
        <p style={{ color: "red", marginTop: 8 }}>{errorMessage}</p>
      )}
      {students.length > 0 && (
        <div style={{ marginTop: 16, textAlign: "left" }}>
          <strong>Parsed Students:</strong>
          <ul>
            {students.map((s, i) => (
              <li key={i}>
                {s.name} ({s.email})
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default UploadStudentCsv; 