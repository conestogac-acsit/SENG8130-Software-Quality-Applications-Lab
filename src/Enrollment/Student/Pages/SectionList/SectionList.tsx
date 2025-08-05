import React, { useState } from "react";

const SectionList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const allSections: string[] = [];

  const filteredSections = allSections.filter((section) =>
    section.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Section List</h1>
      <div className="mb-4">
        <input
          id="section-search"
          type="text"
          className="border rounded px-3 py-1 w-full max-w-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <table className="min-w-full bg-white shadow rounded">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="px-6 py-3 font-medium">Section</th>
          </tr>
        </thead>
        <tbody>
          {filteredSections.length === 0 ? (
            <tr>
              <td className="px-6 py-4 text-gray-500">No sections available</td>
            </tr>
          ) : (
            filteredSections.map((section, index) => (
              <tr key={index} className="border-t">
                <td className="px-6 py-4 text-gray-700">{section}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SectionList;