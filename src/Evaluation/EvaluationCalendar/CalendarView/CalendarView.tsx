import React, { useMemo, useState } from "react";
import { CalendarNavigation } from "../../../Components/CalendarNavigation";
import { useCalendarNavigation } from "../useCalendarNavigation";
import CalendarDayCard from "../../../Components/CalendarDayCard";
import { Evaluation } from "../../EvaluationService";
import { filterEvaluations, FilterOptions } from "./CalendarView.utils";

interface CalendarViewProps {
  evaluations: Evaluation[];
  selectedCampus?: string;
  selectedInstructor?: string;
  selectedType?: string;
  selectedDate?: Date;
}

const CalendarView: React.FC<CalendarViewProps> = ({
  evaluations,
  selectedCampus,
  selectedInstructor,
  selectedType,
  selectedDate,
}) => {
  const [view, setView] = useState<"weekly" | "monthly">("weekly");

  const {
    startDate,
    year,
    month,
    navigateWeek,
    navigateMonth,
    getLabel,
  } = useCalendarNavigation();

  const filteredEvaluations = useMemo(() => {
    const filters: FilterOptions = {
      campus: selectedCampus,
      instructor: selectedInstructor,
      type: selectedType,
      date: selectedDate,
    };
    return filterEvaluations(evaluations, filters);
  }, [evaluations, selectedCampus, selectedInstructor, selectedType, selectedDate]);

  const { groupedByDate, sortedDates } = useMemo(() => {
    const grouped: Record<string, Evaluation[]> = {};

    filteredEvaluations.forEach((ev) => {
      const dateKey = ev.dueDate.toISOString().split("T")[0];

      if (!grouped[dateKey]) grouped[dateKey] = [];
      grouped[dateKey].push(ev);
    });

    const sorted = Object.keys(grouped).sort();

    return { groupedByDate: grouped, sortedDates: sorted };
  }, [filteredEvaluations]);

  if (sortedDates.length === 0) {
    return (
      <p className="text-center text-gray-500">
        No evaluations scheduled
      </p>
    );
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
        {sortedDates.map((isoDate) => {
          const displayDate = new Intl.DateTimeFormat("en-US", {
            weekday: "short",
            year: "numeric",
            month: "short",
            day: "numeric",
            timeZone: "America/Toronto",
          }).format(new Date(isoDate));

          return (
            <CalendarDayCard
              key={isoDate}
              date={displayDate}
              evaluations={groupedByDate[isoDate]}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CalendarView;
