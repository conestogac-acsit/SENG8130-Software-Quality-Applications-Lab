import React from "react";
import { render, screen } from "@testing-library/react";
import MonthlyView from "./MonthlyView";
import { Evaluation } from "../../Evaluation/EvaluationService";

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

  it("renders weekday headers (Sun–Sat)", () => {
    render(<MonthlyView evaluations={[]} month={5} year={2025} />);
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    days.forEach((day) => {
      expect(screen.getByText(day)).toBeInTheDocument();
    });
  });

  it("renders evaluation titles and courses using partial match", () => {
    render(<MonthlyView evaluations={mockEvaluations} month={5} year={2025} />);

    expect(screen.getByText(/Assignment 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Quiz 1/i)).toBeInTheDocument();

    expect(screen.getByText(/SENG8051/i)).toBeInTheDocument();
    expect(screen.getByText(/INFO8171/i)).toBeInTheDocument();
  });

  it("renders grid cells including placeholders before the first day", () => {
    render(<MonthlyView evaluations={[]} month={5} year={2025} />);
    const gridCells = screen.getAllByRole("gridcell");
    expect(gridCells.length).toBeGreaterThanOrEqual(30);
  });

  it("renders fallback message for days with no evaluations", () => {
    render(<MonthlyView evaluations={[]} month={5} year={2025} />);
    expect(screen.getAllByText(/No evaluations scheduled/i).length).toBeGreaterThan(0);
  });
});