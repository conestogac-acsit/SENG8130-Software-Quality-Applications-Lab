import React from "react";

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
      <button
        type="button"
        className={`px-4 py-2 rounded ${
          currentView === "weekly"
            ? "bg-blue-600 text-white"
            : "bg-gray-200 text-gray-800"
        }`}
        onClick={() => setView("weekly")}
      >
        Weekly
      </button>

      <button
        type="button"
        className={`px-4 py-2 rounded ${
          currentView === "monthly"
            ? "bg-blue-600 text-white"
            : "bg-gray-200 text-gray-800"
        }`}
        onClick={() => setView("monthly")}
      >
        Monthly
      </button>
    </div>
  );
};

export default CalendarViewSwitcher;