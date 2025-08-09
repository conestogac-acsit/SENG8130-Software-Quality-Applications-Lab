import { EvaluationReport, CourseWeeklyEvaluationSummary } from "./PdfExportTypes";
import { Evaluation } from "../../EvaluationService";

export function buildEvaluationReport(evaluations: Evaluation[]): EvaluationReport {
  const groupedByCourse: Record<string, Evaluation[]> = {};

  evaluations.forEach((ev) => {
    if (!groupedByCourse[ev.course]) {
      groupedByCourse[ev.course] = [];
    }
    groupedByCourse[ev.course].push(ev);
  });

  const courseSummaries: CourseWeeklyEvaluationSummary[] = Object.entries(groupedByCourse).map(
    ([course, courseEvals]) => {
      const weeksMap: Record<string, Evaluation[]> = {};

      courseEvals.forEach((ev) => {
        const date = new Date(ev.dueDate);
        const weekStart = new Date(date);
        weekStart.setDate(date.getDate() - date.getDay()); // Sunday
        const weekKey = weekStart.toISOString().split("T")[0];
        if (!weeksMap[weekKey]) weeksMap[weekKey] = [];
        weeksMap[weekKey].push(ev);
      });

      const weeks = Object.entries(weeksMap).map(([start, evals]) => {
        const end = new Date(start);
        end.setDate(new Date(start).getDate() + 6);
        return {
          weekStart: start,
          weekEnd: end.toISOString().split("T")[0],
          evaluations: evals,
        };
      });

      const totalWeight = courseEvals.reduce((sum, ev) => sum + (ev.weight || 0), 0);

      return {
        course,
        isOverloaded: totalWeight > 100,
        weeks,
      };
    }
  );

  return {
    reportDate: new Date().toLocaleDateString(),
    totalCourses: Object.keys(groupedByCourse).length,
    courseSummaries,
  };
}