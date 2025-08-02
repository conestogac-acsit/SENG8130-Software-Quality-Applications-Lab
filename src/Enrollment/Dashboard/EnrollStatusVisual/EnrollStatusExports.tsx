import React from 'react';
import { useExportToPng } from './useExportToPng';
import ExportButton from './ExportButton';

const EnrollStatusExports: React.FC = () => {
  const exportDashboard = useExportToPng('enrollment-dashboard');

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">Export Dashboard</h3>
      <div className="flex justify-center">
        <ExportButton onClick={exportDashboard} label="Export Entire Dashboard as PNG" />
      </div>
    </div>
  );
};

export default EnrollStatusExports;
