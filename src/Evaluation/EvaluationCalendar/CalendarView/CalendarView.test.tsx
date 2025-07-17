import React from "react";
import { render, screen } from "@testing-library/react";
import CalendarView from "./CalendarView";
import { Evaluation } from "../../EvaluationService";

// Mock child components
jest.mock("../WeeklyView/WeeklyView", () => () => <div data-testid="weekly-view">Weekly View</div>);
jest.mock("../../../Components/CalendarDayCard/CalendarDayCard", () => ({ date, evaluations }: any) => (
    <div data-testid="calendar-day-card">{date}</div>
));

const mockEvaluations: Evaluation[] = [
    {
        course: "CS101",
        title: "Assignment 1",
        type: "Assignment",
        weight: 10,
        dueDate: new Date("2025-07-14T12:00:00"),
        instructor: "Dr. Smith",
        campus: "Main Campus",
    },
    {
        course: "CS102",
        title: "Quiz 1",
        type: "Quiz",
        weight: 5,
        dueDate: new Date("2025-07-16T12:00:00"),
        instructor: "Dr. Allen",
        campus: "Science Campus",

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

describe("CalendarView", () => {
    it("renders WeeklyView when viewMode is 'weekly'", () => {
        render(<CalendarView evaluations={mockEvaluations} viewMode="weekly" />);
        expect(screen.getByTestId("weekly-view")).toBeInTheDocument();
    });

    it("renders CalendarDayCards when viewMode is 'calendar'", () => {
        render(<CalendarView evaluations={mockEvaluations} viewMode="calendar" />);
        const dayCards = screen.getAllByTestId("calendar-day-card");
        expect(dayCards.length).toBeGreaterThan(0);
    });

    it("renders fallback message when no evaluations are passed", () => {
        render(<CalendarView evaluations={[]} viewMode="calendar" />);
        expect(screen.getByText("No evaluations scheduled")).toBeInTheDocument();
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
