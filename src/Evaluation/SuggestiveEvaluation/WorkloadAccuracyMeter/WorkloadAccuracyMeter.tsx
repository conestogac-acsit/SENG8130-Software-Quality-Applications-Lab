
import React from 'react';

export const WorkloadAccuracyMeter: React.FC<{ accuracy: number }> = ({ accuracy }) => {
  return (
    <div className="bg-white shadow p-4 rounded-2xl mb-4">
      <h2 className="text-xl font-bold mb-2">🎯 Accuracy Rate</h2>
      <div className="w-full bg-gray-200 rounded-full h-4">
        <div
          role="progressbar"
          className="bg-green-500 h-4 rounded-full"
          style={{ width: `${accuracy}%` }}
        ></div>
      </div>
      <p className="text-gray-700 mt-2">{accuracy}% accurate workload prediction</p>
    </div>
  );
};
