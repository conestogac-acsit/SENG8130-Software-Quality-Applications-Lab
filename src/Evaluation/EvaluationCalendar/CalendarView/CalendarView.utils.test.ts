import { filterEvaluations } from "./CalendarView.utils";
import { Evaluation } from "../../EvaluationService/EvaluationService";

function isSameDay(d1: Date, d2: Date): boolean {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
}

describe("filterEvaluations", () => {
  const data: Evaluation[] = [
    {
      course: "Math 101",
      title: "Quiz 1",
      type: "Quiz",
      weight: 10,
      dueDate: new Date("2025-07-17"),
      instructor: "Dr. A",
      campus: "Waterloo",
    },
    {
      course: "Chem 101",
      title: "Final Exam",
      type: "Final Exam",
      weight: 50,
      dueDate: new Date("2025-07-18"),
      instructor: "Dr. B",
      campus: "Milton",
    },
  ];

  it("returns all evaluations when no filters applied", () => {
    const result = filterEvaluations(data, {});
    expect(result).toEqual(data);
  });

  it("returns the correct values when filtering by campus", () => {
    const result = filterEvaluations(data, { campus: "Waterloo" });
    expect(result.length).toBe(1);
    expect(result[0].campus).toBe("Waterloo");
  });

  it("returns the correct values when filtering by date", () => {
    const result = filterEvaluations(data, { date: new Date("2025-07-17") });
    expect(result.length).toBe(1);
    expect(isSameDay(result[0].dueDate, new Date("2025-07-17"))).toBe(true);
  });

  it("returns the correct values when filtering by instructor", () => {
    const result = filterEvaluations(data, { instructor: "Dr. A" });
    expect(result.length).toBe(1);
    expect(result[0].instructor).toBe("Dr. A");
  });

  it("returns the correct values when filtering by evaluation type", () => {
    const result = filterEvaluations(data, { type: "Final Exam" });
    expect(result.length).toBe(1);
    expect(result[0].type).toBe("Final Exam");
  });
});
