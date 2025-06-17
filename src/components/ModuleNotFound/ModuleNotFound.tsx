import React from 'react';

type ModuleNotFoundProps = {
  moduleName: string;
};

const ModuleNotFound: React.FC<ModuleNotFoundProps> = ({ moduleName }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-4">
      <h1 className="text-2xl font-bold mb-2">Module Not Found</h1>
      <p className="text-gray-600">
        The module <span className="font-semibold text-red-500">"{moduleName}"</span> you are trying to access is not available yet.
      </p>
    </div>
  );
};

export default ModuleNotFound;
