import React, { useMemo, useState } from "react";
import { CalendarNavigation } from "../../../Components/CalendarNavigation";
import { useCalendarNavigation } from "../useCalendarNavigation";
import CalendarDayCard from "../../../Components/CalendarDayCard";
import { Evaluation } from "../../EvaluationService";
import WeeklyView from "../WeeklyView/WeeklyView";

interface CalendarViewProps {
  evaluations: Evaluation[];
  viewMode: "weekly" | "calendar"; 
}

const CalendarView: React.FC<CalendarViewProps> = ({ evaluations, viewMode }) => {
  const [view, setView] = useState<"weekly" | "monthly">("weekly");

  const {
    startDate,
    year,
    month,
    navigateWeek,
    navigateMonth,
    getLabel,
  } = useCalendarNavigation();

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

  if (evaluations.length === 0 || sortedDates.length === 0) {
    return (
      <p className="text-center text-gray-500">
        No evaluations scheduled
      </p>
    );
  }

  if (viewMode === "weekly") {
    return <WeeklyView evaluations={evaluations} />;
  }

  return (
    <div className="space-y-4">
      <CalendarNavigation
        label={getLabel(view)}
        onPrev={() =>
          view === "weekly" ? navigateWeek("prev") : navigateMonth("prev")
        }
        onNext={() =>
          view === "weekly" ? navigateWeek("next") : navigateMonth("next")
        }
      />

      <div className="space-y-4">
        {sortedDates.map((dateStr) => (
          <CalendarDayCard
            key={dateStr}
            date={dateStr}
            evaluations={groupedByDate[dateStr]}
          />
        ))}
      </div>
    </div>
  );
};

export default CalendarView;
