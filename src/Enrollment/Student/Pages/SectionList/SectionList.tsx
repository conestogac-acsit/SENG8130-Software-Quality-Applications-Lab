

import React from "react";

// Minimal hardcoded student data
const students = [
  { name: "Charlie Wu", email: "charlie.wu@gmail.com", role: "Student", section: "SENG8130-Spring 2025-Section 2", group: "G1" },
  { name: "Diana Lee", email: "diana.lee@gmail.com", role: "Student", section: "PMGT101-Winter 2025-Section 1", group: "G2" },
  { name: "Ethan Patel", email: "ethan.patel@gmail.com", role: "Student", section: "SENG8130-Spring 2025-Section 2", group: "G1" },
  { name: "Fiona Chen", email: "fiona.chen@gmail.com", role: "Student", section: "PMGT101-Winter 2025-Section 1", group: "G2" },
];

// Extract unique section names
function getSections(): string[] {
  return Array.from(new Set(students.map((s) => s.section)));
}

const SectionList: React.FC = () => {
  const sections = getSections();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Section List</h1>

      <table className="min-w-full bg-white shadow rounded">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="px-6 py-3 font-medium">Section</th>
          </tr>
        </thead>
        <tbody>
          {sections.map((section, index) => (
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
