import React, { useRef, useState, useCallback } from "react";
import Button from "../../Components/Button/Button";
import { parseCsv } from "../ParseCsv";

interface Evaluation {
  course: string;
  title: string;
  type: string;
  weight: number;
  dueDate: Date;
  instructor: string;
  campus: string;
}

const UploadEvaluationCsv: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [evaluations, setEvaluations] = useState<Evaluation[]>([]);
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
        const data = await parseCsv<Evaluation>(selectedFile, "Evaluation");
        setEvaluations(data);
      } catch (err) {
        setErrorMessage("CSV Parse Error: " + err);
      }
    } else {
      setErrorMessage("Please select a CSV file first.");
    }
  }, [selectedFile]);

  return (
    <div>
      <Button onClick={handleSelectFile} label="Select Evaluation CSV" />
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
        <div style={{ marginTop: 8 }}>
          <Button onClick={handleUpload} label="Upload Evaluation CSV" />
        </div>
      )}
      {errorMessage && (
        <p style={{ color: "red", marginTop: 8 }}>{errorMessage}</p>
      )}
      {evaluations.length > 0 && (
        <div style={{ marginTop: 16, textAlign: "left" }}>
          <strong>Parsed Evaluations:</strong>
          <ul>
            {evaluations.map((ev, i) => (
              <li key={i}>
                {ev.title} ({ev.course}) - {ev.dueDate instanceof Date && !isNaN(ev.dueDate.getTime()) ? ev.dueDate.toLocaleDateString() : ev.dueDate + ''}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default UploadEvaluationCsv; 