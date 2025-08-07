import { buildEvaluationReport } from "./reportBuilder";
import { EvaluationReport } from "./PdfExportTypes";
import { Evaluation } from "../../EvaluationService";

const mockEvaluations: Evaluation[] = [
  {
    course: "SENG8130",
    title: "Assignment 1",
    type: "Assignment",
    weight: 50,
    dueDate: new Date("2025-08-04"),
    instructor: "Andy",
    campus: "Main",
  },
  {
    course: "SENG8130",
    title: "Quiz 1",
    type: "Quiz",
    weight: 60,
    dueDate: new Date("2025-08-05"),
    instructor: "Andy",
    campus: "Main",
  },
  {
    course: "SENG8051",
    title: "Lab",
    type: "Practical Lab",
    weight: 20,
    dueDate: new Date("2025-08-07"),
    instructor: "Kiran",
    campus: "Main",
  },
];

describe("buildEvaluationReport", () => {
  let report: EvaluationReport;

  beforeAll(() => {
    report = buildEvaluationReport(mockEvaluations);
  });

  it("should calculate total courses correctly", () => {
    expect(report.totalCourses).toBe(2);
  });

  it("should group evaluations by course", () => {
    const seng8130 = report.courseSummaries.find((c) => c.course === "SENG8130");
    expect(seng8130).toBeDefined();
    expect(seng8130?.weeks.length).toBeGreaterThan(0);
    expect(seng8130?.weeks[0].evaluations.length).toBe(2);
  });

  it("should flag courses as overloaded when weight exceeds 100", () => {
    const seng8130 = report.courseSummaries.find((c) => c.course === "SENG8130");
    expect(seng8130?.isOverloaded).toBe(true);

    const seng8051 = report.courseSummaries.find((c) => c.course === "SENG8051");
    expect(seng8051?.isOverloaded).toBe(false);
  });

  it("should generate correct weekStart/weekEnd", () => {
    const firstWeek = report.courseSummaries[0].weeks[0];
    expect(firstWeek.weekStart).toMatch(/\d{4}-\d{2}-\d{2}/);
    expect(firstWeek.weekEnd).toMatch(/\d{4}-\d{2}-\d{2}/);
  });
});