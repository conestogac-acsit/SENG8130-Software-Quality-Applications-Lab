import { Evaluation } from "../Evaluation/EvaluationService";

export function groupEvaluationsByCourse(
    evaluations: Evaluation[]
): Record<string, Evaluation[]> {
    return evaluations.reduce((acc, ev) => {
        if (!acc[ev.course]) {
            acc[ev.course] = [];
        }
        acc[ev.course].push(ev);
        return acc;
    }, {} as Record<string, Evaluation[]>);
}

export function getTotalWeightPerCourse(
    evaluations: Evaluation[]
): Record<string, number> {
    const grouped = groupEvaluationsByCourse(evaluations);
    const totals: Record<string, number> = {};

    for (const [course, evs] of Object.entries(grouped)) {
        totals[course] = evs.reduce(
            (sum, ev) => sum + (ev.weight || 0),
            0
        );
    }

    return totals;
}

export function getOverloadedCourses(
    evaluations: Evaluation[]
): string[] {
    const totals = getTotalWeightPerCourse(evaluations);
    return Object.entries(totals)
        .filter(([course, total]) => total > 100)
        .map(([course]) => course);
}

export function validateAllCoursesWithinWeightLimit(
    evaluations: Evaluation[]
): boolean {
    return getOverloadedCourses(evaluations).length === 0;
}
