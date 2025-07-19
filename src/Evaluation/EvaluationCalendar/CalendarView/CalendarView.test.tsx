import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CalendarView from "./CalendarView";
import { Evaluation } from "../../EvaluationService";
import { addDays, startOfWeek } from "date-fns";

describe("CalendarView", () => {
  const baseDate = new Date(2025, 5, 24); 
  const monday = startOfWeek(baseDate, { weekStartsOn: 1 }); 

  const mockEvaluations: Evaluation[] = [
    {
      course: "SENG8130",
      title: "Assignment 1",
      type: "Assignment",
      weight: 10,
      dueDate: addDays(monday, 1), 
      instructor: "Andy",
      campus: "Main Campus",
    },
    {
      course: "SENG8061",
      title: "Quiz 1",
      type: "Quiz",
      weight: 5,
      dueDate: addDays(monday, 1), 
      instructor: "Kiran",
      campus: "Main Campus",
    },
    {
      course: "SENG8071",
      title: "Lab Report",
      type: "Practical Lab",
      weight: 15,
      dueDate: addDays(monday, 2), 
      instructor: "Sanju",
      campus: "Milton",
    },
  ];

  it("renders evaluation cards for each date in weekly view by default", () => {
    render(<CalendarView evaluations={mockEvaluations} />);
    expect(screen.getByText(/Assignment 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Quiz 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Lab Report/i)).toBeInTheDocument();
  });

  it("displays fallback message in weekly view when no evaluations exist", () => {
    render(<CalendarView evaluations={[]} />);
    expect(screen.getByText("No evaluations scheduled")).toBeInTheDocument();
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

  it("shows fallback messages when no evaluations exist in weekly mode", () => {
    render(<CalendarView evaluations={[]} />);
    expect(screen.getByText("No evaluations scheduled")).toBeInTheDocument();
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
    expect(screen.getByText(/Assignment 1/i)).toBeInTheDocument();
  });

  it("groups evaluations correctly by date in weekly view", () => {
    render(<CalendarView evaluations={mockEvaluations} />);
    expect(screen.getByText("Tue Jun 24 2025")).toBeInTheDocument();
    expect(screen.getByText("Wed Jun 25 2025")).toBeInTheDocument();
  });
});
