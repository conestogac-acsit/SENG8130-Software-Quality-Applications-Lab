import React, { useMemo } from "react";
import CalendarDayCard from "../../../Components/CalendarDayCard/CalendarDayCard";
import CalendarPdfExportButtons from "../../../Components/CalendarPdfExportButtons/CalendarPdfExportButtons";
import { Evaluation } from "../../EvaluationService";

interface CalendarViewProps {
  evaluations: Evaluation[];
  viewMode: "calendar";
}

const CalendarView: React.FC<CalendarViewProps> = ({ evaluations, viewMode }) => {
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

  const dailyData = sortedDates.map((dateStr) => ({
    date: dateStr,
    evaluations: groupedByDate[dateStr],
  }));

  const courseData = useMemo(() => {
    const courseMap: Record<string, Evaluation[]> = {};
    evaluations.forEach((ev) => {
      if (!courseMap[ev.course]) courseMap[ev.course] = [];
      courseMap[ev.course].push(ev);
    });
    return Object.entries(courseMap).map(([course, evals]) => ({
      course,
      evaluations: evals,
    }));
  }, [evaluations]);

  if (evaluations.length === 0) {
    return (
      <div className="text-center text-gray-500 space-y-4">
        <CalendarPdfExportButtons
          dailyData={[]}
          weeklyData={[]}
          monthlyData={[]}
          courseData={[]}
        />
        <p>No evaluations scheduled</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <CalendarPdfExportButtons
        dailyData={dailyData}
        weeklyData={[]}
        monthlyData={[]}
        courseData={courseData}
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
