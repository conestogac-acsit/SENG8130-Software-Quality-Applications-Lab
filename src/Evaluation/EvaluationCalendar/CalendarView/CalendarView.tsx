import React, { useMemo, useState } from "react";
import { CalendarNavigation } from "../../../Components/CalendarNavigation";
import { useCalendarNavigation } from "../useCalendarNavigation";
import CalendarDayCard from "../../../Components/CalendarDayCard";
import MonthlyView from "../MonthlyView/MonthlyView";
import { Evaluation } from "../../EvaluationService";
import Button from "../../../Components/Button/Button";
import { filterEvaluations, FilterOptions } from "./FilterEvaluation";
import { buildEvaluationReport } from "../PdfExport/reportBuilder";
import { EvaluationReportTemplate } from "../PdfExport/PdfTemplates";

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

  // 🔍 Extract evaluations visible in the current view
  const visibleEvaluations = useMemo(() => {
    if (view === "weekly") {
      const start = new Date(startDate);
      const end = new Date(startDate);
      end.setDate(end.getDate() + 6);
      return filteredEvaluations.filter((ev) => {
        const d = new Date(ev.dueDate);
        return d >= start && d <= end;
      });
    } else {
      return filteredEvaluations.filter((ev) => {
        const d = new Date(ev.dueDate);
        return d.getFullYear() === year && d.getMonth() === month;
      });
    }
  }, [filteredEvaluations, startDate, view, year, month]);

  // 📄 Prepare report (used internally or for export later)
  const report = useMemo(() => buildEvaluationReport(visibleEvaluations), [visibleEvaluations]);

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

      {/* View toggles */}
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

      {/* Calendar Content */}
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
        <MonthlyView evaluations={filteredEvaluations} year={year} month={month} />
      )}

      {/* Hidden Report Render Target for PDF Export */}
      <div id="calendar-pdf" style={{ display: "none" }}>
        <EvaluationReportTemplate report={report} />
      </div>
    </div>
  );
};

export default CalendarView;