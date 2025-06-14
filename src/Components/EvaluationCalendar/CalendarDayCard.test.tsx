
import React from "react";
import { render, screen } from "@testing-library/react";
import CalendarDayCard from "./CalendarDayCard";
import { Evaluation } from "./Evaluation";

describe("CalendarDayCard", () => {
  const date = "Tue Jun 10 2025";

  const mockEvaluations: Evaluation[] = [
    {
      course: "CS101",
      title: "Quiz 1",
      type: "Quiz",
      weight: 10,
      dueDate: new Date("2025-06-10T00:00:00"),
    },
    {
      course: "CS101",
      title: "Assignment 1",
      type: "Assignment",
      weight: 20,
      dueDate: new Date("2025-06-10T00:00:00"),
    },
  ];

  it("renders the correct date heading", () => {
    render(<CalendarDayCard date={date} evaluations={mockEvaluations} />);
    expect(screen.getByText((text) => text.includes(date))).toBeInTheDocument();
  });

  it("displays all evaluations for the day", () => {
    render(<CalendarDayCard date={date} evaluations={mockEvaluations} />);
    expect(screen.getByText("Quiz 1 (Quiz)")).toBeInTheDocument();
    expect(screen.getByText("Assignment 1 (Assignment)")).toBeInTheDocument();
    expect(screen.getAllByText(/Course: CS101/)).toHaveLength(2);
  });

  it("displays fallback message when no evaluations exist", () => {
    render(<CalendarDayCard date={date} evaluations={[]} />);
    expect(
      screen.getByText(/No evaluations scheduled for this day/i)
    ).toBeInTheDocument();
  });
});