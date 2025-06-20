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
      instructor: "Prof. Smith",
      campus: "Main",
    },
    {
      course: "CS102",
      title: "Quiz 1",
      type: "Quiz",
      weight: 5,
      dueDate: new Date("2025-06-18T12:00:00"), 
      instructor: "Prof. Doe",
      campus: "Science",
    },
    {
      course: "CS103",
      title: "Final Exam",
      type: "Final Exam",
      weight: 40,
      dueDate: new Date("2025-06-20T12:00:00"), 
      instructor: "Prof. Jane",
      campus: "West",
    },
  ];

  it("renders 7 day columns for a full week", () => {
    render(<WeeklyView evaluations={mockEvaluations} startDate={baseDate} />);
    const cards = screen.getAllByRole("gridcell");
    expect(cards.length).toBe(7);
  });

  it("shows evaluation titles", () => {
    render(<WeeklyView evaluations={mockEvaluations} startDate={baseDate} />);
    expect(screen.getByText(/Assignment 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Quiz 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Final Exam/i)).toBeInTheDocument();
  });

  it("shows fallback message if no evaluations exist", () => {
    render(<WeeklyView evaluations={[]} startDate={baseDate} />);
    expect(
      screen.getAllByText(/No evaluations scheduled for this day/i).length
    ).toBeGreaterThan(0);
  });
});