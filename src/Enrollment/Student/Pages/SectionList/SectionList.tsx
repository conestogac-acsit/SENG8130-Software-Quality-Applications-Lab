import React from "react";

const SectionList: React.FC = () => {
  const sections: string[] = [];

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
          {sections.length === 0 ? (
            <tr>
              <td className="px-6 py-4 text-gray-500">No sections available</td>
            </tr>
          ) : (
            sections.map((section, index) => (
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
