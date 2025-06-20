import React from 'react';
import { toPng } from 'html-to-image';
import download from 'downloadjs';

const EnrollStatusExports: React.FC = () => {
  const exportEntirePage = () => {
    const element = document.getElementById('enrollment-dashboard');
    if (element) {
      toPng(element, {
        quality: 1.0,
        pixelRatio: 2,
        backgroundColor: '#ffffff'
      })
        .then(dataUrl => download(dataUrl, 'enrollment-dashboard.png'))
        .catch(err => {
          console.error('Export failed:', err);
          alert('Export failed. Please try again.');
        });
    } else {
      console.error('Dashboard element not found');
      alert('Dashboard not found. Please ensure the page is loaded.');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">Export Dashboard</h3>
      <div className="flex justify-center">
        <button
          onClick={exportEntirePage}
          className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-lg shadow-md transition-colors duration-200"
        >
          Export Entire Dashboard as PNG
        </button>
      </div>
    </div>
  );
};

export default EnrollStatusExports;