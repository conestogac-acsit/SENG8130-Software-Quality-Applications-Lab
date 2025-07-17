import React from "react";
import { render, screen } from "@testing-library/react";
import CalendarView from "./CalendarView";
import { Evaluation } from "../../EvaluationService";

const mockEvaluations: Evaluation[] = [
  {
    course: "SENG8130",
    title: "Assignment 1",
    type: "Assignment",
    weight: 10,
    dueDate: new Date("2025-07-14T12:00:00"), 
    instructor: "Andy",
    campus: "Main Campus",
  },
  {
    course: "SENG8061",
    title: "Quiz 1",
    type: "Quiz",
    weight: 5,
    dueDate: new Date("2025-07-15T12:00:00"), 
    instructor: "Kiran",
    campus: "Main Campus",
  },
  {
    course: "SENG8071",
    title: "Lab Report",
    type: "Practical Lab",
    weight: 15,
    dueDate: new Date("2025-07-16T12:00:00"), 
    instructor: "Sanju",
    campus: "Milton",
  },
];

describe("CalendarView (real components, no mocks)", () => {
  it("renders WeeklyView when viewMode is 'weekly'", () => {
    render(<CalendarView evaluations={mockEvaluations} viewMode="weekly" />);
    expect(screen.getByText("Mon Jul 14 2025")).toBeInTheDocument();
    expect(screen.getByText("Wed Jul 16 2025")).toBeInTheDocument();
  });

  it("renders calendar cards when viewMode is 'calendar'", () => {
    render(<CalendarView evaluations={mockEvaluations} viewMode="calendar" />);
    expect(screen.getByText(/jul 14, 2025/i)).toBeInTheDocument();
    expect(screen.getByText(/jul 15, 2025/i)).toBeInTheDocument();
  });

  it("shows fallback message when no evaluations are passed", () => {
    render(<CalendarView evaluations={[]} viewMode="calendar" />);
    expect(screen.getByText(/no evaluations scheduled/i)).toBeInTheDocument();
  });

  it("renders calendar navigation label in calendar view", () => {
    render(<CalendarView evaluations={mockEvaluations} viewMode="calendar" />);
    expect(screen.getByText(/week of/i)).toBeInTheDocument();
  });

  it("renders Prev and Next navigation buttons", () => {
    render(<CalendarView evaluations={mockEvaluations} viewMode="calendar" />);
    expect(screen.getByText(/prev/i)).toBeInTheDocument();
    expect(screen.getByText(/next/i)).toBeInTheDocument();
  });
});
