import React from 'react';

const MonthView: React.FC = () => {
  const months = Array.from({ length: 12 });

  return (
    <div>
      {months.map((_, i) => (
        <div key={i}>0 evaluations</div>
      ))}
    </div>
  );
};

export default MonthView;