import React from "react";
import { render, screen } from "@testing-library/react";
import MonthlyView from "./MonthlyView";

const mockEvaluations = [
  {
    course: "CS101",
    title: "Assignment 1",
    type: "Assignment" as const,
    weight: 10,
    dueDate: new Date("2025-06-05T12:00:00"), // June 5
  },
  {
    course: "CS102",
    title: "Final Exam",
    type: "Final Exam" as const,
    weight: 40,
    dueDate: new Date("2025-06-15T12:00:00"), // June 15
  },
];

describe("MonthlyView", () => {
  it("renders calendar with 7 weekday headers", () => {
    render(<MonthlyView evaluations={[]} month={5} year={2025} />);
    const weekdayHeaders = screen.getAllByText(/Sun|Mon|Tue|Wed|Thu|Fri|Sat/);
    expect(weekdayHeaders).toHaveLength(7);
  });

  it("renders correct number of days in the month", () => {
    render(<MonthlyView evaluations={[]} month={5} year={2025} />);
    // June 2025 has 30 days
    expect(screen.getByText("30")).toBeInTheDocument();
  });

  it("displays evaluations on their respective dates", () => {
    render(<MonthlyView evaluations={mockEvaluations} month={5} year={2025} />);
    expect(screen.getByText("Assignment 1")).toBeInTheDocument();
    expect(screen.getByText("Final Exam")).toBeInTheDocument();
  });

  it("renders placeholder cells before the 1st day if the month doesn't start on Sunday", () => {
    render(<MonthlyView evaluations={[]} month={5} year={2025} />);
    // June 1, 2025 is a Sunday, so 0 placeholders expected
    const allCells = screen.getAllByRole("gridcell", { hidden: true });
    expect(allCells.length).toBeGreaterThanOrEqual(30);
  });
});