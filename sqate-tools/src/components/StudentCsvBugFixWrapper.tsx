import React from 'react';
import Papa from 'papaparse';
import { handleFileNotFound, handleGenericError } from '../utils/errorHandler';

type Student = {
  Name: string;
  ID: string;
  Email: string;
  Section: string;
  Document: string;
  GitHubEnrolled: string;
  LoopEnrolled: string;
};

const StudentCsvBugFixWrapper: React.FC = () => {
  const handleFixedFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) {
      handleFileNotFound();
      e.target.value = '';
      return;
    }

    // ✅ Team Member 4: Additional bug fix - file type validation
    if (!file.name.toLowerCase().endsWith('.csv')) {
      handleGenericError("Only .csv files are supported.");
      e.target.value = '';
      return;
    }

    try {
      Papa.parse<Student>(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          if (results.errors.length > 0) {
            // ✅ Team Member 4: Show row-level error info
            const detailedErrors = results.errors
              .map(err => `Row ${err.row}: ${err.message}`)
              .join(', ');
            handleGenericError(`CSV parsing error(s): ${detailedErrors}`);
          } else {
            // ✅ Team Member 4: Alert success
            alert("✅ Student data uploaded successfully.");
            console.log("Parsed student data:", results.data);
          }
        },
        error: (error) => {
          handleGenericError(error.message);
        },
      });
    } catch (err: any) {
      handleGenericError(err.message || "Unknown error occurred.");
    }
  };

  return (
    <div className="p-4 border rounded-md bg-blue-50 text-center">
      <h2 className="text-xl font-semibold mb-3 text-blue-900">🛠 Upload CSV (Bug Fix Version)</h2>
      <input
        type="file"
        accept=".csv"
        onClick={(e) => { e.currentTarget.value = ''; }} // reset file input
        onChange={handleFixedFileChange}
        className="border p-2 rounded"
      />
    </div>
  );
};

export default StudentCsvBugFixWrapper;
