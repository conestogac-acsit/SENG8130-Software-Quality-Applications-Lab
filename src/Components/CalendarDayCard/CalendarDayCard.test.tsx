import React from "react";
import { render, screen } from "@testing-library/react";
import CalendarDayCard from "./CalendarDayCard";

describe("CalendarDayCard", () => {
  const mockEvaluations = [
    {
      course: "CS101",
      title: "Quiz 1",
      type: "Quiz" as const,
      weight: 10,
      dueDate: new Date("2025-06-10"),
    },
    {
      course: "CS101",
      title: "Mid Exam",
      type: "Mid Exam" as const,
      weight: 30,
      dueDate: new Date("2025-06-10"),
    },
  ];

  it("renders the given date", () => {
    render(<CalendarDayCard date="Tue Jun 10 2025" evaluations={mockEvaluations} />);
    expect(screen.getByText("Tue Jun 10 2025")).toBeInTheDocument();
  });

  it("renders evaluation entries", () => {
    render(<CalendarDayCard date="Tue Jun 10 2025" evaluations={mockEvaluations} />);
    expect(screen.getByText("Quiz 1 (Quiz)")).toBeInTheDocument();
    expect(screen.getByText("Mid Exam (Mid Exam)")).toBeInTheDocument();
    expect(screen.getAllByText(/Course: CS101/)).toHaveLength(2);
  });

  it("renders a message if no evaluations are present", () => {
    render(<CalendarDayCard date="Tue Jun 10 2025" evaluations={[]} />);
    expect(screen.getByText("No evaluations scheduled for this day.")).toBeInTheDocument();
  });
});
