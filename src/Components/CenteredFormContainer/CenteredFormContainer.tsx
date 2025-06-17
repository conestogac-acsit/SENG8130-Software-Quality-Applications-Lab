import React, { useEffect } from 'react';

interface CenteredFormContainerProps {
  children: React.ReactNode;
  onMount?: () => void;
}

const CenteredFormContainer: React.FC<CenteredFormContainerProps> = ({ children, onMount }) => {
  useEffect(() => {
    if (onMount) onMount();
  }, [onMount]);
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="p-6 rounded-lg bg-white shadow-md min-w-[320px]">
        {children}
      </div>
    </div>
  );
};

export default CenteredFormContainer;
