import { Evaluation } from "../../EvaluationService";

export interface DailyEvaluationSummary {
    date: string;
    evaluations: Evaluation[];
}

export interface WeeklyEvaluationSummary {
    weekStart: string;
    weekEnd: string;
    evaluations: Evaluation[];
}

export interface MonthlyEvaluationSummary {
    year: number;
    month: number;
    evaluations: Evaluation[];
}

export interface CourseWeeklyEvaluationSummary {
    course: string;
    isOverloaded: boolean;
    weeks: {
        weekStart: string;
        weekEnd: string;
        evaluations: Evaluation[];
    }[];
}

export interface EvaluationReport {
    reportDate: string;
    totalCourses: number;
    courseSummaries: CourseWeeklyEvaluationSummary[];
}