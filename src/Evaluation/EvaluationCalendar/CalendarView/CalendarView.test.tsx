import React from "react";
import { render, screen } from "@testing-library/react";
import CalendarView from "./CalendarView";
import { Evaluation } from "../../EvaluationService";

jest.mock("../../../Components/CalendarDayCard/CalendarDayCard", () => ({ date }: any) => (
  <div data-testid="calendar-day-card">{date}</div>
));

jest.mock("../../../Components/CalendarPdfExportButtons/CalendarPdfExportButtons", () => ({
  __esModule: true,
  default: () => (
    <div data-testid="pdf-export-buttons">
      <button>Daily</button>
      <button>Weekly</button>
      <button>Monthly</button>
      <button>Course</button>
    </div>
  ),
}));

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
];

describe("CalendarView with PDF Export Buttons", () => {
  it("renders export buttons when evaluations are present", () => {
    render(<CalendarView evaluations={mockEvaluations} viewMode="calendar" />);
    expect(screen.getByTestId("pdf-export-buttons")).toBeInTheDocument();
  });

  it("renders CalendarDayCard for each grouped date", () => {
    render(<CalendarView evaluations={mockEvaluations} viewMode="calendar" />);
    expect(screen.getAllByTestId("calendar-day-card").length).toBe(1);
  });

  it("renders fallback message with export buttons when no evaluations", () => {
    render(<CalendarView evaluations={[]} viewMode="calendar" />);
    expect(screen.getByTestId("pdf-export-buttons")).toBeInTheDocument();
    expect(screen.getByText(/no evaluations scheduled/i)).toBeInTheDocument();
  });
});
