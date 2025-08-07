import React from "react";
import { render, screen } from "@testing-library/react";
import MonthlyView from "./MonthlyView";
import { Evaluation } from "../../EvaluationService";

describe("MonthlyView", () => {
  const mockEvaluations: Evaluation[] = [
    {
      course: "SENG8051",
      title: "Assignment 1",
      type: "Assignment",
      weight: 10,
      dueDate: new Date("2025-06-24"),
      instructor: "Alex",
      campus: "Main",
    },
    {
      course: "INFO8171",
      title: "Quiz 1",
      type: "Quiz",
      weight: 5,
      dueDate: new Date("2025-06-21"),
      instructor: "Julia",
      campus: "Milton",
    },
  ];

  it("renders evaluation titles and courses using partial match", () => {
    render(<MonthlyView evaluations={mockEvaluations} month={5} year={2025} />);

    expect(screen.getByText(/Assignment 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Quiz 1/i)).toBeInTheDocument();

    expect(screen.getByText(/SENG8051/i)).toBeInTheDocument();
    expect(screen.getByText(/INFO8171/i)).toBeInTheDocument();
  });

  it("renders weekday headers only when evaluations exist", () => {
    render(<MonthlyView evaluations={mockEvaluations} month={5} year={2025} />);
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    days.forEach((day) => {
      expect(screen.getByText(day)).toBeInTheDocument();
    });
  });

  it("does NOT render weekday headers when there are no evaluations", () => {
    render(<MonthlyView evaluations={[]} month={5} year={2025} />);
    expect(screen.queryByText("Sun")).not.toBeInTheDocument();
    expect(screen.queryByText("Mon")).not.toBeInTheDocument();
  });

  it("does NOT render grid cells or daily fallbacks when no evaluations", () => {
    render(<MonthlyView evaluations={[]} month={5} year={2025} />);
    expect(screen.queryAllByRole("gridcell").length).toBe(0);
    expect(
      screen.queryByText(/No evaluations scheduled for this day/i)
    ).not.toBeInTheDocument();
  });

  it("renders monthly-level fallback message when no evaluations exist", () => {
    render(<MonthlyView evaluations={[]} month={5} year={2025} />);
    expect(
      screen.getByText(/No evaluations are scheduled for this month/i)
    ).toBeInTheDocument();
  });

  it("does NOT render monthly-level fallback message when evaluations exist", () => {
    render(<MonthlyView evaluations={mockEvaluations} month={5} year={2025} />);
    expect(
      screen.queryByText(/No evaluations are scheduled for this month/i)
    ).not.toBeInTheDocument();
  });
});
