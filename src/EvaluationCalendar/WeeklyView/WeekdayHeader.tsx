import React from "react";

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const WeekdayHeader: React.FC = () => {
  return (
    <div className="grid grid-cols-7 text-center font-bold text-sm">
      {days.map((day) => (
        <div key={day}>{day}</div>
      ))}
    </div>
  );
};

export default WeekdayHeader;