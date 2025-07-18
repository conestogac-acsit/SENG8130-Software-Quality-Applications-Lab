import React from "react";
import { render, screen } from "@testing-library/react";
import WeeklyView from "./WeeklyView";
import { Evaluation } from "../../EvaluationService";

describe("WeeklyView", () => {
  const currentWeekStart = new Date("2025-06-23T00:00:00");

  const mockEvaluations: Evaluation[] = [
    {
      course: "SENG8130",
      title: "Assignment 1",
      type: "Assignment",
      weight: 10,
      dueDate: new Date("2025-06-24T12:00:00"), 
      instructor: "Andy",
      campus: "Main Campus",
    },
    {
      course: "SENG8061",
      title: "Quiz 1",
      type: "Quiz",
      weight: 5,
      dueDate: new Date("2025-06-24T12:00:00"), 
      instructor: "Kiran",
      campus: "Main Campus",
    },
    {
      course: "SENG8071",
      title: "Lab Report",
      type: "Practical Lab",
      weight: 15,
      dueDate: new Date("2025-06-25T12:00:00"), 
      instructor: "Sanju",
      campus: "Milton",
    },
  ];

  it("renders 7 day columns for a full week", () => {
    render(<WeeklyView evaluations={mockEvaluations} currentWeekStart={currentWeekStart} />);
    const days = screen.getAllByRole("gridcell");
    expect(days.length).toBe(7);
  });

  it("displays correct date headers from Monday to Sunday", () => {
    render(<WeeklyView evaluations={mockEvaluations} currentWeekStart={currentWeekStart} />);
    const expectedDates = [
      "Mon Jun 23 2025",
      "Tue Jun 24 2025",
      "Wed Jun 25 2025",
      "Thu Jun 26 2025",
      "Fri Jun 27 2025",
      "Sat Jun 28 2025",
      "Sun Jun 29 2025",
    ];

    expectedDates.forEach((date) => {
      expect(screen.getByText(date)).toBeInTheDocument();
    });
  });

  it("renders evaluation details correctly under respective days", () => {
    render(<WeeklyView evaluations={mockEvaluations} currentWeekStart={currentWeekStart} />);

    expect(screen.getByText("Assignment 1 (Assignment)")).toBeInTheDocument();
    expect(screen.getByText("Quiz 1 (Quiz)")).toBeInTheDocument();
    expect(screen.getByText("Lab Report (Practical Lab)")).toBeInTheDocument();

    expect(screen.getByText("Course: SENG8130 | Weight: 10%")).toBeInTheDocument();
    expect(screen.getByText("Course: SENG8061 | Weight: 5%")).toBeInTheDocument();
    expect(screen.getByText("Course: SENG8071 | Weight: 15%")).toBeInTheDocument();
  });

    it("shows fallback message for empty days", () => {
    render(<WeeklyView evaluations={mockEvaluations} currentWeekStart={currentWeekStart} />);
    const emptyMessages = screen.getAllByText("No evaluations scheduled for this day.");
    expect(emptyMessages.length).toBe(5); 
  });

});
