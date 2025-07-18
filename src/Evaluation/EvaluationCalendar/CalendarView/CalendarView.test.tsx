import { render, screen } from "@testing-library/react";
import CalendarView from "./CalendarView";
import { Evaluation } from "../../EvaluationService";

const sampleEvaluations: Evaluation[] = [
  {
    course: "PROG1001",
    title: "Assignment 1",
    type: "Assignment",
    weight: 10,
    dueDate: new Date("2025-07-09"),
    instructor: "Prof. A",
    campus: "Waterloo",
  },
  {
    course: "PROG1002",
    title: "Project Phase 1",
    type: "Project",
    weight: 30,
    dueDate: new Date("2025-07-11"),
    instructor: "Prof. B",
    campus: "Doon",
  },
];

describe("CalendarView", () => {
  it("renders 'No evaluations scheduled' when evaluation list is empty", () => {
    render(<CalendarView evaluations={[]} viewMode="calendar" />);
    expect(screen.getByText("No evaluations scheduled")).toBeInTheDocument();
  });

  it("renders CalendarDayCard for each grouped date", () => {
    render(<CalendarView evaluations={sampleEvaluations} viewMode="calendar" />);
    expect(
      screen.getByText((text) => text.includes("Assignment 1"))
    ).toBeInTheDocument();
    expect(
      screen.getByText((text) => text.includes("Project Phase 1"))
    ).toBeInTheDocument();
  });

  it("renders CalendarPdfExportButtons", () => {
    render(<CalendarView evaluations={sampleEvaluations} viewMode="calendar" />);
    expect(screen.getByText("Export Daily PDF")).toBeInTheDocument();
    expect(screen.getByText("Export Weekly PDF")).toBeInTheDocument();
    expect(screen.getByText("Export Monthly PDF")).toBeInTheDocument();
    expect(screen.getByText("Export Entire Course PDF")).toBeInTheDocument();
  });
});
