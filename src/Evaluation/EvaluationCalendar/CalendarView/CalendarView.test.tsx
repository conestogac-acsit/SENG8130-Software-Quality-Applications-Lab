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
      dueDate: new Date("2025-06-24T12:00:00-04:00"),
      instructor: "Andy",
      campus: "Main Campus",
    },
    {
      course: "SENG8061",
      title: "Quiz 1",
      type: "Quiz",
      weight: 5,
      dueDate: new Date("2025-06-24T12:00:00-04:00"),
      instructor: "Kiran",
      campus: "Main Campus",
    },
    {
      course: "SENG8071",
      title: "Lab Report",
      type: "Practical Lab",
      weight: 15,
      dueDate: new Date("2025-06-25T12:00:00-04:00"),
      instructor: "Sanju",
      campus: "Milton",
    },
  ];

  it("renders evaluation cards for each date", () => {
    render(<CalendarView evaluations={mockEvaluations} />);

    expect(screen.getByText(/Assignment 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Quiz 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Lab Report/i)).toBeInTheDocument();
  });

  it("shows fallback message when no evaluations are scheduled", () => {
    render(<CalendarView evaluations={[]} />);
    expect(
      screen.getByText(/No evaluations scheduled/i)
    ).toBeInTheDocument();
  });

  it("renders CalendarNavigation label", () => {
    render(<CalendarView evaluations={mockEvaluations} />);
    expect(
      screen.getByText(/Week of/i)
    ).toBeInTheDocument();
  });

  it("renders Prev and Next buttons", () => {
    render(<CalendarView evaluations={mockEvaluations} />);
    expect(screen.getByText(/Prev/i)).toBeInTheDocument();
    expect(screen.getByText(/Next/i)).toBeInTheDocument();
  });

  it("groups evaluations under correct dates", () => {
    render(<CalendarView evaluations={mockEvaluations} />);

    expect(
      screen.getByText("Tue, Jun 24, 2025")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Wed, Jun 25, 2025")
    ).toBeInTheDocument();
  });
});
