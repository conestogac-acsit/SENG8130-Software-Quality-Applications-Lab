import React from "react";
import { render, screen } from "@testing-library/react";
import CalendarView from "./CalendarView";
import { Evaluation } from "../../EvaluationService";

describe("CalendarView", () => {
  const mockEvaluations: Evaluation[] = [
    {
      course: "SENG8130",
      title: "Assignment 1",
      type: "Assignment",
      weight: 10,
      dueDate: new Date("2025-06-24").toISOString() as unknown as Date,
      instructor: "Andy",
      campus: "Main Campus",
    },
    {
      course: "SENG8061",
      title: "Quiz 1",
      type: "Quiz",
      weight: 5,
      dueDate: new Date("2025-06-24").toISOString() as unknown as Date,
      instructor: "Kiran",
      campus: "Main Campus",
    },
  ];

  const STORAGE_KEY = "Evaluation_Data_Storage";

  beforeEach(() => {
    localStorage.clear();
  });

  it("renders fallback when no evaluations in storage", () => {
    render(<CalendarView />);
    expect(screen.getByText(/No evaluations scheduled/i)).toBeInTheDocument();
  });

  it("renders evaluations from localStorage", () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mockEvaluations));
    render(<CalendarView />);
    expect(screen.getByText(/Assignment 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Quiz 1/i)).toBeInTheDocument();
  });
});
