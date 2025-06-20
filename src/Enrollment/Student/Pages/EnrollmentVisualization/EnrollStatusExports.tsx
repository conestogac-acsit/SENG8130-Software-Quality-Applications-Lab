import React from 'react';

const EnrollStatusExports: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">Export Dashboard</h3>
      <div className="flex justify-center">
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-lg shadow-md transition-colors duration-200">
          Export Dashboard
        </button>
      </div>
    </div>
  );
};

export default EnrollStatusExports;