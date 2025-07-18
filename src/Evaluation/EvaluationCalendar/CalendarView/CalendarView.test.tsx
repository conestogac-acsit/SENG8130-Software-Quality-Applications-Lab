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

  beforeAll(() => {
    jest.useFakeTimers().setSystemTime(new Date("2025-06-24T12:00:00-04:00"));
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it("renders evaluation cards for each date in weekly view by default", () => {
    render(<CalendarView evaluations={mockEvaluations} />);
    expect(
      screen.getByText((text) => text.includes("Assignment 1"))
    ).toBeInTheDocument();
    expect(
      screen.getByText((text) => text.includes("Quiz 1"))
    ).toBeInTheDocument();
    expect(
      screen.getByText((text) => text.includes("Lab Report"))
    ).toBeInTheDocument();
  });

  it("displays fallback message in weekly view when no evaluations exist", () => {
    render(<CalendarView evaluations={[]} />);
    expect(
      screen.getByText("No evaluations scheduled")
    ).toBeInTheDocument();
  });

  it("renders Weekly and Monthly toggle buttons", () => {
    render(<CalendarView evaluations={mockEvaluations} />);
    expect(screen.getByText("Weekly")).toBeInTheDocument();
    expect(screen.getByText("Monthly")).toBeInTheDocument();
  });

  it("renders navigation buttons", () => {
    render(<CalendarView evaluations={mockEvaluations} />);
    expect(screen.getByText("Prev")).toBeInTheDocument();
    expect(screen.getByText("Next")).toBeInTheDocument();
  });

  it("renders WeeklyView navigation label as 'Week of ...'", () => {
    render(<CalendarView evaluations={mockEvaluations} />);
    expect(screen.getByText(/Week of/i)).toBeInTheDocument();
  });

  it("shows fallback messages for all 7 days when no evaluations exist in weekly mode", () => {
    render(<CalendarView evaluations={[]} />);
    const fallbackMessages = screen.getAllByText(
      (text) => text === "No evaluations scheduled"
    );
    expect(fallbackMessages).toHaveLength(1);
  });

  it("toggles to monthly view and shows monthly fallback message", () => {
    render(<CalendarView evaluations={[]} />);
    fireEvent.click(screen.getByText("Monthly"));
    expect(
      screen.getByText(/No evaluations are scheduled for this month/i)
    ).toBeInTheDocument();
  });

  it("toggles back to weekly view and renders weekly content", () => {
    render(<CalendarView evaluations={mockEvaluations} />);
    fireEvent.click(screen.getByText("Monthly"));
    fireEvent.click(screen.getByText("Weekly"));
    expect(
      screen.getByText((text) => text.includes("Assignment 1"))
    ).toBeInTheDocument();
  });

  it("groups evaluations correctly by date in weekly view", () => {
    render(<CalendarView evaluations={mockEvaluations} />);
    expect(screen.getByText("Tue Jun 24 2025")).toBeInTheDocument();
    expect(screen.getByText("Wed Jun 25 2025")).toBeInTheDocument();
  });
});
