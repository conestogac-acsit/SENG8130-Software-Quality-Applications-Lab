// src/Enrollment/Student/Pages/SectionList/SectionList.tsx

import React from "react";
import { getSections } from "../../studentData/getSections";

/**
 * Renders a table of unique student sections.
 *
 * This component is part of the Student module and is designed to help users
 * view and navigate through different academic sections. Each section is displayed
 * as a clickable link that routes users to the associated student list.
 *
 * The UI also includes a placeholder toolbar for future enhancements like search,
 * sorting, and filtering. Upload functionality has been intentionally excluded.
 */
const SectionList: React.FC = () => {
  const sections = getSections(); // Retrieves section data from the local student dataset

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Section List</h1>

      {/* Toolbar UI for future filter/sort features */}
      <div className="flex justify-between mb-4">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search..."
            className="border rounded px-3 py-1"
          />
          <button className="border rounded px-3 py-1">Sort by</button>
          <button className="border rounded px-3 py-1">Filters</button>
        </div>

        {/* Placeholder for download functionality only */}
        <div className="flex gap-2">
          <button className="border px-4 py-2 rounded hover:bg-gray-100">
            Download Excel
          </button>
        </div>
      </div>

      {/* Dynamic section list rendered in a table */}
      <table className="min-w-full bg-white shadow rounded">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="px-6 py-3 font-medium">Name</th>
          </tr>
        </thead>
        <tbody>
          {sections.map((section: string, index: number) => (
            <tr key={index} className="border-t">
              <td className="px-6 py-4">
                <a
                  href={`/students?section=${encodeURIComponent(section)}`}
                  className="font-semibold text-blue-600 hover:underline"
                >
                  {section}
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SectionList;
