import React from 'react';

interface ExportButtonProps {
  onClick: () => void;
  label?: string;
}

const ExportButton: React.FC<ExportButtonProps> = ({ onClick, label = 'Export as PNG' }) => (
  <button
    onClick={onClick}
    className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-lg shadow-md transition-colors duration-200 flex items-center gap-3"
  >
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    </svg>
    {label}
  </button>
);

export default ExportButton;
