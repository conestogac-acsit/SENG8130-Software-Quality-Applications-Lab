import React, { useMemo, useState } from "react";
import { CalendarNavigation } from "../../../Components/CalendarNavigation";
import { useCalendarNavigation } from "../useCalendarNavigation";
import CalendarDayCard from "../../../Components/CalendarDayCard";
import WeeklyView from "../WeeklyView/WeeklyView";
import MonthlyView from "../MonthlyView/MonthlyView";
import { Evaluation } from "../../EvaluationService";
import Button from "../../../Components/Button/Button";
import { filterEvaluations, FilterOptions } from "./FilterEvaluation";

interface CalendarViewProps {
  evaluations: Evaluation[];
  selectedInstructor?: string;
  selectedType?: string;
  selectedDate?: Date;
}

const CalendarView: React.FC<CalendarViewProps> = ({
  evaluations,
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
      instructor: selectedInstructor,
      type: selectedType,
      date: selectedDate,
    };
    return filterEvaluations(evaluations, filters);
  }, [evaluations, selectedInstructor, selectedType, selectedDate]);

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

  const showNoEvaluationsMessage =
    view === "weekly" && sortedDates.length === 0;

  return (
    <div className="space-y-4">
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

      <CalendarNavigation
        label={getLabel(view)}
        onPrev={() =>
          view === "weekly" ? navigateWeek("prev") : navigateMonth("prev")
        }
        onNext={() =>
          view === "weekly" ? navigateWeek("next") : navigateMonth("next")
        }
      />

      {showNoEvaluationsMessage ? (
        <p className="text-center text-gray-500 italic">
          No evaluations scheduled
        </p>
      ) : view === "weekly" ? (
        <WeeklyView
          evaluations={filteredEvaluations}
        />
      ) : (
        <MonthlyView evaluations={filteredEvaluations} year={year} month={month} />
      )}
    </div>
  );
};

export default CalendarView;
