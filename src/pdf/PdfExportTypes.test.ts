import {
    DailyEvaluationSummary,
    WeeklyEvaluationSummary,
    MonthlyEvaluationSummary,
    CourseWeeklyEvaluationSummary,
    EvaluationReport,
} from "./PdfExportTypes";
import { Evaluation } from "../Evaluation/EvaluationService";

describe("PdfExportTypes", () => {
    const dummyEvaluation: Evaluation = {
        course: "PROG8051",
        title: "Assignment 1",
        type: "Assignment",
        weight: 30,
        dueDate: new Date("2025-07-10"),
        instructor: "Jane Doe",
        campus: "Milton",
    };

    it("should match DailyEvaluationSummary structure", () => {
        const dailySummary: DailyEvaluationSummary = {
            date: "2025-07-10",
            evaluations: [dummyEvaluation],
        };

        expect(dailySummary.date).toBe("2025-07-10");
        expect(dailySummary.evaluations[0].course).toBe("PROG8051");
    });

    it("should match WeeklyEvaluationSummary structure", () => {
        const weeklySummary: WeeklyEvaluationSummary = {
            weekStart: "2025-07-07",
            weekEnd: "2025-07-13",
            evaluations: [dummyEvaluation],
        };

        expect(weeklySummary.weekStart).toBe("2025-07-07");
        expect(weeklySummary.evaluations[0].type).toBe("Assignment");
    });

    it("should match MonthlyEvaluationSummary structure", () => {
        const monthlySummary: MonthlyEvaluationSummary = {
            year: 2025,
            month: 6, // July (zero-based)
            evaluations: [dummyEvaluation],
        };

        expect(monthlySummary.year).toBe(2025);
        expect(monthlySummary.evaluations[0].campus).toBe("Milton");
    });

    it("should match CourseWeeklyEvaluationSummary structure", () => {
        const courseSummary: CourseWeeklyEvaluationSummary = {
            course: "PROG8051",
            weeks: [
                {
                    weekStart: "2025-07-07",
                    weekEnd: "2025-07-13",
                    evaluations: [dummyEvaluation],
                },
            ],
        };

        expect(courseSummary.course).toBe("PROG8051");
        expect(courseSummary.weeks[0].weekStart).toBe("2025-07-07");
    });

    it("should match EvaluationReport structure", () => {
        const report: EvaluationReport = {
            reportDate: "2025-07-10",
            totalCourses: 1,
            courseSummaries: [
                {
                    course: "PROG8051",
                    weeks: [
                        {
                            weekStart: "2025-07-07",
                            weekEnd: "2025-07-13",
                            evaluations: [dummyEvaluation],
                        },
                    ],
                },
            ],
        };

        expect(report.totalCourses).toBe(1);
        expect(report.courseSummaries[0].weeks[0].evaluations[0].title).toBe(
            "Assignment 1"
        );
    });
});