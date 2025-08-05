import { Evaluation } from "./EvaluationService";

export interface Conflict {
  date: string;
  evaluations: Evaluation[];
}

export class EvaluationConflictDetector {
  static detectConflicts(
    evaluations: Evaluation[],
    weightThreshold = 30
  ): Conflict[] {
    const groupedByDate: Record<string, Evaluation[]> = {};

    evaluations.forEach((ev) => {
      const dateKey = ev.dueDate.toISOString().split("T")[0];
      if (!groupedByDate[dateKey]) {
        groupedByDate[dateKey] = [];
      }
      groupedByDate[dateKey].push(ev);
    });

    const conflicts: Conflict[] = [];

    for (const [date, evals] of Object.entries(groupedByDate)) {
      const heavyEvals = evals.filter((e) => e.weight >= weightThreshold);
      const uniqueCourses = new Set(heavyEvals.map((e) => e.course));

      if (heavyEvals.length > 1 && uniqueCourses.size > 1) {
        conflicts.push({
          date,
          evaluations: heavyEvals,
        });
      }
    }

    return conflicts;
  }
}
