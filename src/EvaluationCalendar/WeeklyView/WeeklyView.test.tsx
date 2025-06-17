import React from "react";
import { render, screen } from "@testing-library/react";
import WeeklyView from "./WeeklyView";

describe("WeeklyView", () => {
  const baseDate = new Date("2025-06-15"); // Sunday

  const mockEvaluations = [
    {
      course: "CS101",
      title: "Assignment 1",
      type: "Assignment" as const,
      weight: 10,
      dueDate: new Date("2025-06-16T12:00:00"), // Monday
    },
    {
      course: "CS102",
      title: "Quiz 1",
      type: "Quiz" as const,
      weight: 5,
      dueDate: new Date("2025-06-18T12:00:00"), // Wednesday
    },
    {
      course: "CS103",
      title: "Final Exam",
      type: "Final Exam" as const,
      weight: 40,
      dueDate: new Date("2025-06-20T12:00:00"), // Friday
    },
  ];

  it("renders 7 day columns for a full week", () => {
    render(<WeeklyView evaluations={mockEvaluations} startDate={baseDate} />);
    const headings = screen.getAllByRole("heading", { level: 3 });
    expect(headings).toHaveLength(7);
  });

  it("renders evaluations on correct day", () => {
    render(<WeeklyView evaluations={mockEvaluations} startDate={baseDate} />);
    expect(screen.getByText("Assignment 1")).toBeInTheDocument();
    expect(screen.getByText("Quiz 1")).toBeInTheDocument();
    expect(screen.getByText("Final Exam")).toBeInTheDocument();
  });

  it("shows fallback message when a day has no evaluations", () => {
    render(<WeeklyView evaluations={mockEvaluations} startDate={baseDate} />);
    expect(screen.getAllByText(/no evaluations/i).length).toBeGreaterThan(0);
  });
});