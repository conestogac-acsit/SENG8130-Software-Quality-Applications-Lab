import React from 'react';
import Papa from 'papaparse';
import {
  handleFileNotFound,
  handleGenericError
} from '../utils/errorHandler';

type Student = {
  Name: string;
  ID: string;
  Email: string;
  Section: string;
  Document: string;
  GitHubEnrolled: string;
  LoopEnrolled: string;
};

const UploadStudentCsvWithErrorHandling: React.FC = () => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) {
      handleFileNotFound();
      e.target.value = ''; // reset so onChange triggers again
      return;
    }

    try {
      Papa.parse<Student>(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          if (results.errors.length > 0) {
            const errorMessages = results.errors.map(err => err.message).join(', ');
            handleGenericError(`CSV parsing error(s): ${errorMessages}`);
          } else {
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
    <div className="p-4 border rounded-md bg-gray-100 text-center">
      <h2 className="text-2xl font-bold mb-4">Upload Student CSV</h2>
      <input
        type="file"
        accept=".csv"
        onChange={handleFileChange}
        onClick={(e) => { e.currentTarget.value = ''; }}
        className="border p-2 rounded"
      />
    </div>
  );
};

export default UploadStudentCsvWithErrorHandling;
