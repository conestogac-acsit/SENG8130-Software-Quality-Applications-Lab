import {
    groupEvaluationsByCourse,
    getTotalWeightPerCourse,
    getOverloadedCourses,
    validateAllCoursesWithinWeightLimit,
} from "./evaluationWeightUtils";
import { Evaluation } from "../Evaluation/EvaluationService";

describe("evaluationWeightUtils", () => {
    const evals: Evaluation[] = [
        {
            course: "PROG8051",
            title: "Quiz 1",
            type: "Quiz",
            weight: 20,
            dueDate: new Date("2025-07-07"),
            instructor: "Jane Doe",
            campus: "Milton",
        },
        {
            course: "PROG8051",
            title: "Assignment 1",
            type: "Assignment",
            weight: 30,
            dueDate: new Date("2025-07-10"),
            instructor: "Jane Doe",
            campus: "Milton",
        },
        {
            course: "MATH8010",
            title: "Mid Exam",
            type: "Mid Exam",
            weight: 70,
            dueDate: new Date("2025-07-15"),
            instructor: "John Smith",
            campus: "Milton",
        },
    ];

    it("groups evaluations by course correctly", () => {
        const result = groupEvaluationsByCourse(evals);
        expect(result["PROG8051"]).toHaveLength(2);
        expect(result["MATH8010"]).toHaveLength(1);
        expect(result["PROG8051"][0].title).toBe("Quiz 1");
    });

    it("computes total weight per course correctly", () => {
        const totals = getTotalWeightPerCourse(evals);
        expect(totals["PROG8051"]).toBe(50);
        expect(totals["MATH8010"]).toBe(70);
    });

    it("returns an empty array if no overloaded courses exist", () => {
        const overloaded = getOverloadedCourses(evals);
        expect(overloaded).toEqual([]);
    });

    it("identifies overloaded courses correctly", () => {
        const overloadedEvals: Evaluation[] = [
            ...evals,
            {
                course: "PROG8051",
                title: "Final Exam",
                type: "Final Exam",
                weight: 60,
                dueDate: new Date("2025-08-01"),
                instructor: "Jane Doe",
                campus: "Milton",
            },
        ];

        const overloaded = getOverloadedCourses(overloadedEvals);
        expect(overloaded).toEqual(["PROG8051"]);
    });

    it("validates all courses within weight limit when valid", () => {
        const valid = validateAllCoursesWithinWeightLimit(evals);
        expect(valid).toBe(true);
    });

    it("returns false from validation when any course exceeds 100%", () => {
        const overloadedEvals: Evaluation[] = [
            ...evals,
            {
                course: "PROG8051",
                title: "Final Exam",
                type: "Final Exam",
                weight: 60,
                dueDate: new Date("2025-08-01"),
                instructor: "Jane Doe",
                campus: "Milton",
            },
        ];

        const valid = validateAllCoursesWithinWeightLimit(overloadedEvals);
        expect(valid).toBe(false);
    });
});
