import React from 'react';
import EnrollStatusExports from './EnrollStatusExports';

const EnrollStatusVisual: React.FC = () => {
  return (
    <div id="enrollment-dashboard" className="space-y-10 p-6">
      <EnrollStatusExports />
    </div>
  );
};

export default EnrollStatusVisual;
