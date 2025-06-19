import React from "react";
import { render, screen } from "@testing-library/react";
import WeeklyView from "./WeeklyView";
import { Evaluation } from "../../Evaluation/EvaluationService";

describe("WeeklyView", () => {
  const baseDate = new Date("2025-06-15"); 

  const mockEvaluations: Evaluation[] = [
    {
      course: "CS101",
      title: "Assignment 1",
      type: "Assignment",
      weight: 10,
      dueDate: new Date("2025-06-16T12:00:00"), 
      instructor: "Alex",
      campus: "Main"
    },
    {
      course: "CS102",
      title: "Quiz 1",
      type: "Quiz",
      weight: 5,
      dueDate: new Date("2025-06-18T12:00:00"), 
      instructor: "Allen",
      campus: "West"
    },
    {
      course: "CS103",
      title: "Final Exam",
      type: "Final Exam",
      weight: 40,
      dueDate: new Date("2025-06-20T12:00:00"), 
      instructor: "Lee",
      campus: "East"
    }
  ];

  it("renders 7 day columns for a full week", () => {
    render(<WeeklyView evaluations={mockEvaluations} startDate={baseDate} />);
    const headings = screen.getAllByRole("heading", { level: 2 });
    expect(headings.length).toBe(7);
  });

it("renders evaluations on correct days", () => {
  render(<WeeklyView evaluations={mockEvaluations} startDate={baseDate} />);

  expect(screen.getByText((content) => content.includes("Assignment 1"))).toBeInTheDocument();
  expect(screen.getByText((content) => content.includes("Quiz 1"))).toBeInTheDocument();
  expect(screen.getByText((content) => content.includes("Final Exam"))).toBeInTheDocument();
});

  it("shows fallback message on empty days", () => {
    render(<WeeklyView evaluations={mockEvaluations} startDate={baseDate} />);
    const fallbacks = screen.getAllByText("No evaluations scheduled for this day.");
    expect(fallbacks.length).toBeGreaterThan(0);
  });
});