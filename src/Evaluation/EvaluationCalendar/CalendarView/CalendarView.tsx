import React, { useMemo } from "react";
import CalendarDayCard from "../../../Components/CalendarDayCard/CalendarDayCard";
import CalendarPdfExportButtons from "../../../Components/CalendarPdfExportButtons/CalendarPdfExportButtons";
import { Evaluation } from "../../EvaluationService";

interface CalendarViewProps {
  evaluations: Evaluation[];
  viewMode: "calendar"; // Only supports calendar mode for this version
}

const CalendarView: React.FC<CalendarViewProps> = ({ evaluations, viewMode }) => {
  // Export handlers
  const handleExportDaily = () => {
    console.log("Exporting Daily View to PDF...");
  };

  const handleExportWeekly = () => {
    console.log("Exporting Weekly View to PDF...");
  };

  const handleExportMonthly = () => {
    console.log("Exporting Monthly View to PDF...");
  };

  const handleExportCourse = () => {
    console.log("Exporting Entire Course to PDF...");
  };

  // Fallback for no evaluations
  if (evaluations.length === 0) {
    return (
      <div className="text-center text-gray-500 space-y-4">
        <CalendarPdfExportButtons
          onExportDaily={handleExportDaily}
          onExportWeekly={handleExportWeekly}
          onExportMonthly={handleExportMonthly}
          onExportCourse={handleExportCourse}
        />
        <p>No evaluations scheduled</p>
      </div>
    );
  }

  // Group and sort evaluations
  const { groupedByDate, sortedDates } = useMemo(() => {
    const grouped: Record<string, Evaluation[]> = {};

    evaluations.forEach((ev) => {
      const dateKey = new Intl.DateTimeFormat("en-US", {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
        timeZone: "America/Toronto",
      }).format(ev.dueDate);

      if (!grouped[dateKey]) grouped[dateKey] = [];
      grouped[dateKey].push(ev);
    });

    const sorted = Object.keys(grouped).sort(
      (a, b) => new Date(a).getTime() - new Date(b).getTime()
    );

    return { groupedByDate: grouped, sortedDates: sorted };
  }, [evaluations]);

  return (
    <div className="space-y-4">
      <CalendarPdfExportButtons
        onExportDaily={handleExportDaily}
        onExportWeekly={handleExportWeekly}
        onExportMonthly={handleExportMonthly}
        onExportCourse={handleExportCourse}
      />
      {sortedDates.map((dateStr) => (
        <CalendarDayCard
          key={dateStr}
          date={dateStr}
          evaluations={groupedByDate[dateStr]}
        />
      ))}
    </div>
  );
};

export default CalendarView;
