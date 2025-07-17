import React from "react";
import Button from "../Button/Button";

interface CalendarViewSwitcherProps {
  currentView: "weekly" | "monthly";
  setView: (view: "weekly" | "monthly") => void;
}

const CalendarViewSwitcher: React.FC<CalendarViewSwitcherProps> = ({
  currentView,
  setView,
}) => {
  return (
    <div className="flex gap-2">
      <div
        className={`rounded ${
          currentView === "weekly"
            ? "bg-blue-600 text-white"
            : "bg-gray-200 text-gray-800"
        }`}
      >
        <Button
          label="Weekly"
          onClick={() => setView("weekly")}
        />
      </div>

      <div
        className={`rounded ${
          currentView === "monthly"
            ? "bg-blue-600 text-white"
            : "bg-gray-200 text-gray-800"
        }`}
      >
        <Button
          label="Monthly"
          onClick={() => setView("monthly")}
        />
      </div>
    </div>
  );
};

export default CalendarViewSwitcher;
