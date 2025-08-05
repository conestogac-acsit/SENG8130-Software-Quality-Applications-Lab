import { EvaluationConflictDetector, Conflict } from "./EvaluationConflictDetector";
import { Evaluation, EvaluationType } from "./EvaluationService";

describe("EvaluationConflictDetector", () => {
    
const baseEvaluation = {
  title: "Test",
  type: "Final Exam" as EvaluationType,
  instructor: "Prof A",
  campus: "Main",
};

  const createEval = (
    course: string,
    weight: number,
    dateStr: string
  ): Evaluation => ({
    ...baseEvaluation,
    course,
    weight,
    dueDate: new Date(dateStr),
  });

  it("should detect a conflict with two evaluations on the same date and different courses", () => {
    const evaluations: Evaluation[] = [
      createEval("Math", 40, "2025-09-01"),
      createEval("Physics", 35, "2025-09-01"),
    ];

    const conflicts = EvaluationConflictDetector.detectConflicts(evaluations);
    expect(conflicts.length).toBe(1);
    expect(conflicts[0].date).toBe("2025-09-01");
    expect(conflicts[0].evaluations.length).toBe(2);
  });

  it("should not detect conflict if evaluations are on different dates", () => {
    const evaluations: Evaluation[] = [
      createEval("Math", 40, "2025-09-01"),
      createEval("Physics", 35, "2025-09-02"),
    ];

    const conflicts = EvaluationConflictDetector.detectConflicts(evaluations);
    expect(conflicts.length).toBe(0);
  });

  it("should not detect conflict if weight is below threshold", () => {
    const evaluations: Evaluation[] = [
      createEval("Math", 20, "2025-09-01"),
      createEval("Physics", 25, "2025-09-01"),
    ];

    const conflicts = EvaluationConflictDetector.detectConflicts(evaluations);
    expect(conflicts.length).toBe(0);
  });

  it("should not detect conflict if evaluations are from the same course", () => {
    const evaluations: Evaluation[] = [
      createEval("Math", 40, "2025-09-01"),
      createEval("Math", 35, "2025-09-01"),
    ];

    const conflicts = EvaluationConflictDetector.detectConflicts(evaluations);
    expect(conflicts.length).toBe(0);
  });

  it("should support a custom weight threshold", () => {
    const evaluations: Evaluation[] = [
      createEval("Math", 25, "2025-09-01"),
      createEval("Physics", 28, "2025-09-01"),
    ];

    const conflicts = EvaluationConflictDetector.detectConflicts(evaluations, 25);
    expect(conflicts.length).toBe(1);
  });

  it("should return multiple conflicts if they exist on different dates", () => {
    const evaluations: Evaluation[] = [
      createEval("Math", 40, "2025-09-01"),
      createEval("Physics", 35, "2025-09-01"),
      createEval("English", 50, "2025-09-03"),
      createEval("Chemistry", 45, "2025-09-03"),
    ];

    const conflicts = EvaluationConflictDetector.detectConflicts(evaluations);
    expect(conflicts.length).toBe(2);
    expect(conflicts.map((c) => c.date)).toEqual(["2025-09-01", "2025-09-03"]);
  });
});
