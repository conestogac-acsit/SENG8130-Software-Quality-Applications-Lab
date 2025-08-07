import React, { useMemo, useState } from "react";
import { CalendarNavigation } from "../../../Components/CalendarNavigation";
import { useCalendarNavigation } from "../useCalendarNavigation";
import CalendarDayCard from "../../../Components/CalendarDayCard";
import MonthlyView from "../MonthlyView/MonthlyView";
import CalendarPdfExportButtons from "../../../Components/CalendarPdfExportButtons/CalendarPdfExportButtons";
import { Evaluation } from "../../EvaluationService";
import Button from "../../../Components/Button/Button";
import { filterEvaluations, FilterOptions } from "./FilterEvaluation";
import { buildEvaluationReport } from "../PdfExport/reportBuilder";
import { EvaluationReportTemplate } from "../PdfExport/PdfTemplates";
import { exportEvaluationReportToPDF } from "../PdfExport/PdfGenerator";
import { EvaluationReport } from "../PdfExport/PdfExportTypes";

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

  const report = useMemo(
    () => buildEvaluationReport(visibleEvaluations),
    [visibleEvaluations]
  );

  const renderPDF = (report: EvaluationReport, filename: string) => {
    const container = document.getElementById("calendar-pdf");
    if (!container) return;

    container.innerHTML = "";
    const element = <EvaluationReportTemplate report={report} />;
    // Assumes DOM is already rendered via React; otherwise use ReactDOM.render()
    setTimeout(() => {
      exportEvaluationReportToPDF("calendar-pdf", filename);
    }, 100);
  };

  const handleExportWeekly = () => {
    const start = new Date(startDate);
    const end = new Date(startDate);
    end.setDate(end.getDate() + 6);

    const weeklyEvals = filteredEvaluations.filter((ev) => {
      const date = new Date(ev.dueDate);
      return date >= start && date <= end;
    });

    const report = buildEvaluationReport(weeklyEvals);
    renderPDF(report, "weekly-evaluation-report.pdf");
  };

  const handleExportMonthly = () => {
    const monthlyEvals = filteredEvaluations.filter((ev) => {
      const d = new Date(ev.dueDate);
      return d.getFullYear() === year && d.getMonth() === month;
    });

    const report = buildEvaluationReport(monthlyEvals);
    renderPDF(report, "monthly-evaluation-report.pdf");
  };

  const handleExportDaily = () => {
    const dailyEvals = filteredEvaluations.filter((ev) => {
      const d = new Date(ev.dueDate);
      return selectedDate
        ? d.toDateString() === new Date(selectedDate).toDateString()
        : false;
    });

    const report = buildEvaluationReport(dailyEvals);
    renderPDF(report, "daily-evaluation-report.pdf");
  };

  const handleExportCourse = () => {
    const report = buildEvaluationReport(filteredEvaluations);
    renderPDF(report, "course-evaluation-report.pdf");
  };

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

      {/* Export buttons */}
      <CalendarPdfExportButtons
        onExportDaily={handleExportDaily}
        onExportWeekly={handleExportWeekly}
        onExportMonthly={handleExportMonthly}
        onExportCourse={handleExportCourse}
      />

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
        <MonthlyView
          evaluations={filteredEvaluations}
          year={year}
          month={month}
        />
      )}

      {/* Hidden Report Render Target for PDF Export */}
      <div id="calendar-pdf" style={{ display: "none" }}>
        <EvaluationReportTemplate report={report} />
      </div>
    </div>
  );
};

export default CalendarView;