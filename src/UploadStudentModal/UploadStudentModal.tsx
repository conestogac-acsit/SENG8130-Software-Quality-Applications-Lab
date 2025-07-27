import React, { useState } from "react";
import { LocalStorage } from "../localStorageService";
import { parseCsv } from "../ParseCsvService";
import { Email, Student } from "../Enrollment/Student/studentData";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}
const STUDENT_DATA_STORAGE_KEY = "students_list_key";
const UploadStudentModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const storage = new LocalStorage();
  const mapToStudent = (row: any, index: number): Student => {
    const validatedEmail = new Email(row.email).toString();
    return {
      studentId: row.studentId || row.id || "",
      name: row.name || "",
      email: validatedEmail,
      section: row.section || "",
      group: row.group || "",
      role: row.role || "",
      imageUrl: row.imageUrl || "",
      notes: row.notes || "",
      isLoopEnrolled: (row.loopStatus || "").toLowerCase() === "enrolled",
      isGithubEnrolled: (row.githubStatus || "").toLowerCase() === "enrolled",
    };
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setError(null);
      setSuccessMsg(null);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a CSV file.");
      return;
    }
    try {
      const rawData = await parseCsv<any>(file, "Student");
      const newData: Student[] = rawData.map((row, index) => {
        try {
          return mapToStudent(row, index);
        } catch (err: any) {
          throw new Error(`Row ${index + 2}: ${err.message}`);
        }
      });
      const existingData = storage.load<Student[]>(STUDENT_DATA_STORAGE_KEY) || [];
      const combinedMap = new Map<string, Student>();
      for (const student of existingData) {
        combinedMap.set(student.studentId, student);
      }
      for (const student of newData) {
        combinedMap.set(student.studentId, student);
      }
      const mergedData = Array.from(combinedMap.values());
      storage.save(STUDENT_DATA_STORAGE_KEY, mergedData);
      setSuccessMsg("Students uploaded successfully!");
      setError(null);
    } catch (err: any) {
      setError(err.toString());
      setSuccessMsg(null);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-xl font-semibold mb-4">Upload Student CSV</h2>
        <input type="file" accept=".csv" onChange={handleFileChange} />
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        {successMsg && <p className="text-green-600 text-sm mt-2">{successMsg}</p>}
        <div className="flex justify-end gap-3 mt-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
            {successMsg ? "Close" : "Cancel"}
          </button>
          {!successMsg && (
            <button onClick={handleUpload} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Upload
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
export default UploadStudentModal;
