import React from 'react';

interface ExportButtonProps {
  onClick: () => void;
  label?: string;
  testId?: string;
  ariaLabel?: string;
}

const ExportButton: React.FC<ExportButtonProps> = ({
  onClick,
  label = 'Export as PNG',
  testId = 'export-button',
  ariaLabel,
}) => (
  <button
    onClick={onClick}
    className="cursor-pointer bg-gradient-to-r from-pink-500 to-yellow-500 
               hover:from-pink-600 hover:to-yellow-600 text-white font-bold 
               px-6 py-3 rounded-full shadow-md transition-all duration-300"
    aria-label={ariaLabel || label}
    data-testid={testId}
    type="button"
  >
    {label}
  </button>
);

export default ExportButton;
