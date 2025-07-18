import React, { useMemo, useState } from "react";
import { CalendarNavigation } from "../../../Components/CalendarNavigation";
import { useCalendarNavigation } from "../useCalendarNavigation";
import CalendarDayCard from "../../../Components/CalendarDayCard";
import MonthlyView from "../MonthlyView/MonthlyView";
import { Evaluation } from "../../EvaluationService";
import Button from "../../../Components/Button/Button"; 

interface CalendarViewProps {
  evaluations: Evaluation[];
}

const CalendarView: React.FC<CalendarViewProps> = ({ evaluations }) => {
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

  const showNoEvaluationsMessage =
    view === "weekly" && sortedDates.length === 0;

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

      <div className="flex justify-center gap-4">
        <Button
          onClick={() => setView("weekly")}
          label="Weekly"
          disabled={view === "weekly"}
        />
        <Button
          onClick={() => setView("monthly")}
          label="Monthly"
          disabled={view === "monthly"}
        />
      </div>

      {showNoEvaluationsMessage ? (
        <p className="text-center text-gray-500 italic">
          No evaluations scheduled
        </p>
      ) : view === "weekly" ? (
        <div className="space-y-4">
          {sortedDates.map((dateStr) => (
            <CalendarDayCard
              key={dateStr}
              date={dateStr}
              evaluations={groupedByDate[dateStr]}
            />
          ))}
        </div>
      ) : (
        <MonthlyView evaluations={evaluations} year={year} month={month} />
      )}
    </div>
  );
};

export default CalendarView;
