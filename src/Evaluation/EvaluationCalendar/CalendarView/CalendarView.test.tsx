import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
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

  it("renders weekly view with evaluation cards by default", () => {
    render(<CalendarView evaluations={mockEvaluations} />);
    expect(screen.getAllByText(/Assignment 1/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/Quiz 1/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/Lab Report/i).length).toBeGreaterThanOrEqual(1);
  });

  it("displays fallback message in weekly view when no evaluations exist", () => {
    render(<CalendarView evaluations={[]} />);
    expect(
      screen.getByText(/No evaluations scheduled/i)
    ).toBeInTheDocument();
  });

  it("displays calendar navigation label", () => {
    render(<CalendarView evaluations={mockEvaluations} />);
    expect(screen.getByText(/Week of/i)).toBeInTheDocument();
  });

  it("renders Weekly and Monthly toggle buttons", () => {
    render(<CalendarView evaluations={mockEvaluations} />);
    expect(screen.getByText("Weekly")).toBeInTheDocument();
    expect(screen.getByText("Monthly")).toBeInTheDocument();
  });

  it("displays monthly fallback when there are no evaluations", () => {
    render(<CalendarView evaluations={[]} />);
    fireEvent.click(screen.getByText("Monthly"));
    expect(
      screen.getByText(/No evaluations are scheduled for this month/i)
    ).toBeInTheDocument();
  });

  it("renders Prev and Next navigation buttons", () => {
    render(<CalendarView evaluations={mockEvaluations} />);
    expect(screen.getByText("Prev")).toBeInTheDocument();
    expect(screen.getByText("Next")).toBeInTheDocument();
  });

  it("groups evaluations correctly by date in weekly view", () => {
    render(<CalendarView evaluations={mockEvaluations} />);
    expect(screen.getByText((text) => text.includes("2025-06-24"))).toBeInTheDocument();
    expect(screen.getByText((text) => text.includes("2025-06-25"))).toBeInTheDocument();
  });

  it("toggles views correctly", () => {
    render(<CalendarView evaluations={mockEvaluations} />);
    const weeklyButton = screen.getByText("Weekly");
    const monthlyButton = screen.getByText("Monthly");

    fireEvent.click(monthlyButton);
    expect(
      screen.getByText(/No evaluations are scheduled for this month/i)
    ).toBeInTheDocument();

    fireEvent.click(weeklyButton);
    expect(screen.getAllByText(/Assignment 1/i).length).toBeGreaterThanOrEqual(1);
  });

  it("displays overloaded course warning when weight exceeds 100%", () => {
    const overloadedEvaluations: Evaluation[] = [
      {
        course: "SENG9999",
        title: "Overloaded Assignment",
        type: "Assignment",
        weight: 110,
        dueDate: new Date("2025-06-24T12:00:00-04:00"),
        instructor: "Heavy",
        campus: "Test Campus",
      },
    ];

    render(<CalendarView evaluations={overloadedEvaluations} />);

    expect(screen.getByText(/Overloaded Courses/i)).toBeInTheDocument();
    expect(screen.getByText(/SENG9999 \(110%\)/i)).toBeInTheDocument();
  });

  it("does not show overloaded warning when all courses are within limit", () => {
    const normalEvaluations: Evaluation[] = [
      {
        course: "SENG1001",
        title: "Safe Assignment",
        type: "Assignment",
        weight: 50,
        dueDate: new Date("2025-06-24T12:00:00-04:00"),
        instructor: "Mild",
        campus: "Test Campus",
      },
      {
        course: "SENG1001",
        title: "Another Assignment",
        type: "Assignment",
        weight: 50,
        dueDate: new Date("2025-06-25T12:00:00-04:00"),
        instructor: "Mild",
        campus: "Test Campus",
      },
    ];

    render(<CalendarView evaluations={normalEvaluations} />);
    expect(screen.queryByText(/Overloaded Courses/i)).not.toBeInTheDocument();
  });

});
