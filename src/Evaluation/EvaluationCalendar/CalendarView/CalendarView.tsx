import React, { useMemo, useState } from "react";
import { CalendarNavigation } from "../../../Components/CalendarNavigation";
import { useCalendarNavigation } from "../useCalendarNavigation";
import CalendarDayCard from "../../../Components/CalendarDayCard";
import MonthlyView from "../MonthlyView/MonthlyView";
import { Evaluation } from "../../EvaluationService";
import Button from "../../../Components/Button/Button"; 
import { filterEvaluations, FilterOptions } from "./FilterEvaluation";
import { evaluationCalendarStyles as styles } from "../Styles/evaluationCalendarStyles";

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

  const toggleDarkMode = () => {
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className={styles.calendarViewContainer}>
      {/* Dark mode toggle */}
      <div className="flex justify-end">
        <button
          onClick={toggleDarkMode}
          className="text-sm px-3 py-1 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
        >
          Toggle Dark Mode
        </button>
      </div>

      {/* Navigation */}
      <CalendarNavigation
        label={getLabel(view)}
        onPrev={() =>
          view === "weekly" ? navigateWeek("prev") : navigateMonth("prev")
        }
        onNext={() =>
          view === "weekly" ? navigateWeek("next") : navigateMonth("next")
        }
      />

      {/* View Toggle */}
      <div className={styles.viewToggleWrapper}>
        <button
          className={styles.viewToggleButton(view === "weekly")}
          onClick={() => setView("weekly")}
          disabled={view === "weekly"}
        >
          Weekly
        </button>
        <button
          className={styles.viewToggleButton(view === "monthly")}
          onClick={() => setView("monthly")}
          disabled={view === "monthly"}
        >
          Monthly
        </button>
      </div>

      {/* Content */}
      {showNoEvaluationsMessage ? (
        <p className={styles.noEvaluationsMessage}>
          No evaluations scheduled
        </p>
      ) : view === "weekly" ? (
        <div className={styles.cardSection}>
          {sortedDates.map((dateStr) => {
            const displayDate = new Intl.DateTimeFormat("en-US", {
              weekday: "short",
              year: "numeric",
              month: "short",
              day: "numeric",
              timeZone: "America/Toronto",
            }).format(new Date(dateStr));

            return (
              <CalendarDayCard
                key={dateStr}
                date={displayDate}
                evaluations={groupedByDate[dateStr]}
              />
            );
          })}
        </div>
      ) : (
        <MonthlyView evaluations={evaluations} year={year} month={month} />
      )}
    </div>
  );
};


export default CalendarView;
