import React, { useMemo } from "react";
import CalendarDayCard from "../../../Components/CalendarDayCard/CalendarDayCard";
import { Evaluation } from "../../EvaluationService";
import {
  Campus,
  getEvaluationsForCampus,
} from "../../EvaluationService/EvaluationsForCampusService";

interface CalendarViewProps {
  evaluations: Evaluation[];
}

const CalendarView: React.FC<CalendarViewProps> = ({ evaluations }) => {
  const campusEvaluations = useMemo(
    () => getEvaluationsForCampus(evaluations, Campus.Waterloo),
    [evaluations]
  );

  const { groupedByDate, sortedDates } = useMemo(() => {
    const grouped: Record<string, Evaluation[]> = {};

    campusEvaluations.forEach((ev) => {
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
  }, [campusEvaluations]);

  if (sortedDates.length === 0) {
    return (
      <p className="text-center text-gray-500">
        No evaluations scheduled
      </p>
    );
  }

  return (
    <div className="space-y-4">
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
