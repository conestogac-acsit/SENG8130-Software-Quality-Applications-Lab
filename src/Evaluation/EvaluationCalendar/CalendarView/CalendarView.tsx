import React, { useMemo, useState, useEffect } from "react";
import { CalendarNavigation } from "../../../Components/CalendarNavigation";
import { useCalendarNavigation } from "../useCalendarNavigation";
import CalendarDayCard from "../../../Components/CalendarDayCard";
import MonthlyView from "../MonthlyView/MonthlyView";
import { Evaluation, EvaluationService } from "../../EvaluationService";
import Button from "../../../Components/Button/Button"; 
import { filterEvaluations, FilterOptions } from "./FilterEvaluation";
import { LocalStorage } from "../../../localStorageService";

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

  const [allEvaluations, setAllEvaluations] = useState<Evaluation[]>([]);
  const service = useMemo(() => new EvaluationService(new LocalStorage()), []);

  useEffect(() => {
    setAllEvaluations(evaluations);
  }, [evaluations]);

  const handleDeleteEvaluation = (target: Evaluation) => {
    try {
      const updated = service.deleteEvaluation(target);
      setAllEvaluations(updated);
    } catch (err) {
      console.error("Failed to delete evaluation:", err);
    }
  };

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
    return filterEvaluations(allEvaluations, filters); 
  }, [allEvaluations, selectedInstructor, selectedType, selectedDate]);

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
              onDeleteEvaluation={handleDeleteEvaluation}  
            />
          ))}
        </div>
      ) : (
        <MonthlyView evaluations={allEvaluations} year={year} month={month} /> 
      )}
    </div>
  );
};

export default CalendarView;
