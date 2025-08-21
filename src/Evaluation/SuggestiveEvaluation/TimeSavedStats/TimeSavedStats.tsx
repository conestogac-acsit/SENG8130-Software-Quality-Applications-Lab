import React from 'react';

export const TimeSavedStats: React.FC<{ hours: number }> = ({ hours }) => (
  <div className="bg-white shadow p-4 rounded-2xl mb-4">
    <h2 className="text-xl font-bold mb-2">⏱️ Time Saved</h2>
    <p className="text-gray-700 text-lg">
      Estimated {hours} hours saved using smart scheduling.
    </p>
  </div>
);