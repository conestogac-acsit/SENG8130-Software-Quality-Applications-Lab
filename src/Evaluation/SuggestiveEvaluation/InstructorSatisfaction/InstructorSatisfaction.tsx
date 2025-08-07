import React, { useState } from 'react';

export const InstructorSatisfaction: React.FC = () => {
  const [rating, setRating] = useState<number>(0);

  const handleClick = (value: number) => {
    setRating(value);
    localStorage.setItem('instructorRating', value.toString());
  };

  return (
    <div className="bg-white shadow p-4 rounded-2xl mb-4">
      <h2 className="text-xl font-bold mb-2">⭐ Instructor Satisfaction</h2>
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((val) => (
          <button
            key={val}
            className={`text-2xl ${val <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
            onClick={() => handleClick(val)}
          >
            ⭐
          </button>
        ))}
      </div>
    </div>
  );
};