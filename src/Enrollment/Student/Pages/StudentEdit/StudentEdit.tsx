import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Student } from "../../Services/StudentInfo";
import { findStudentById } from "../../Services/findStudentById";
import { updateStudent } from "../../Services/uipdateStudent";

// StudentEdit.tsx
//
// This component is currently using placeholder service functions for finding and updating student information.
// Once the student list upload feature is implemented, this component will be updated to connect with the actual data source.

const StudentEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const student = id ? findStudentById(id) : undefined;

  const [formData, setFormData] = useState<Student | undefined>(() => student);

  if (!formData) {
    return <div className="p-6 text-red-600">Student not found.</div>;
  }

  const handleChange = (field: keyof Student, value: string) => {
    setFormData((prev) =>
      prev ? { ...prev, [field]: value } : prev
    );
  };

  const handleSave = () => {
    updateStudent(formData);
    alert("Student information updated successfully.");
    navigate(`/profile/${formData.id}`);
  };

  return (
    <div className="p-6 space-y-6 overflow-auto">
      <div className="bg-white shadow rounded-lg p-6 space-y-4">
        <h2 className="text-2xl font-bold mb-4">Edit Student Info</h2>
          Name: <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            className="border rounded px-3 py-2"
          />
        {/* Avatar */}
        <div className="flex items-center space-x-6">
          <img
            src={formData.imageUrl || "https://via.placeholder.com/100"}
            alt="Profile"
            className="w-24 h-24 rounded-full"
          />
          <input
            type="text"
            placeholder="Image URL"
            value={formData.imageUrl || ""}
            onChange={(e) => handleChange("imageUrl", e.target.value)}
            className="border rounded px-3 py-2 w-full"
          />
        </div>

        {/* Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          Email:<input
            type="text"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            className="border rounded px-3 py-2"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          Section: <input
            type="text"
            placeholder="Section"
            value={formData.section}
            onChange={(e) => handleChange("section", e.target.value)}
            className="border rounded px-3 py-2"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          Group: <input
            type="text"
            placeholder="Group"
            value={formData.group}
            onChange={(e) => handleChange("group", e.target.value)}
            className="border rounded px-3 py-2"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          Role: <input
            type="text"
            placeholder="Role"
            value={formData.role}
            onChange={(e) => handleChange("role", e.target.value)}
            className="border rounded px-3 py-2"
          />
        </div>

        {/* Notes */}
        <div>
          <textarea
            placeholder="Notes"
            value={formData.notes || ""}
            onChange={(e) => handleChange("notes", e.target.value)}
            rows={4}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* Save Button */}
        <div className="text-right">
          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentEdit;
