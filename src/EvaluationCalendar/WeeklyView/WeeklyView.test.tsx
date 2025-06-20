import React from "react";
import { render, screen } from "@testing-library/react";
import WeeklyView from "./WeeklyView";
import { Evaluation } from "../../Evaluation/EvaluationService";

describe("WeeklyView", () => {
  const baseDate = new Date("2025-06-15"); // Sunday

  const mockEvaluations: Evaluation[] = [
    {
      course: "CS101",
      title: "Assignment 1",
      type: "Assignment",
      weight: 10,
      dueDate: new Date("2025-06-15T12:00:00"), // Sunday
      instructor: "Dr. Smith",
      campus: "Main Campus",
    },
    {
      course: "CS102",
      title: "Quiz 1",
      type: "Quiz",
      weight: 5,
      dueDate: new Date("2025-06-17T12:00:00"), // Tuesday
      instructor: "Dr. Allen",
      campus: "Science Campus",
    },
  ];

  it("renders 7 day columns for a full week", () => {
    render(<WeeklyView evaluations={mockEvaluations} startDate={baseDate} />);
    const gridCells = screen.getAllByRole("gridcell");
    expect(gridCells.length).toBe(7);
  });

  it("renders evaluation titles correctly", () => {
    render(<WeeklyView evaluations={mockEvaluations} startDate={baseDate} />);
    expect(
      screen.getByText((content) => content.includes("Assignment 1"))
    ).toBeInTheDocument();
    expect(
      screen.getByText((content) => content.includes("Quiz 1"))
    ).toBeInTheDocument();
  });

  it("shows fallback message from CalendarDayCard for empty days", () => {
  render(<WeeklyView evaluations={mockEvaluations} startDate={baseDate} />);
  const fallbackMessages = screen.getAllByText("No evaluations scheduled for this day.");
  expect(fallbackMessages.length).toBeGreaterThan(0); 
  });
  
});