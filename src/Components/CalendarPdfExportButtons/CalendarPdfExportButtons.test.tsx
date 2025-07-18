import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CalendarPdfExportButtons from "./CalendarPdfExportButtons";
import { Evaluation } from "../../Evaluation/EvaluationService";

const commonEvaluation: Evaluation = {
  course: "SENG1001",
  title: "Assignment 1",
  type: "Assignment",
  weight: 10,
  dueDate: new Date("2025-07-25"),
  instructor: "John",
  campus: "Doon",
};

const dailyData = [
  {
    date: "2025-07-25",
    evaluations: [commonEvaluation],
  },
];

const weeklyData = [
  {
    weekStart: "2025-07-21",
    evaluations: [commonEvaluation],
  },
];

const monthlyData = [
  {
    month: "July 2025",
    evaluations: [commonEvaluation],
  },
];

const courseData = [
  {
    course: "SENG1001",
    evaluations: [commonEvaluation],
  },
];

describe("CalendarPdfExportButtons", () => {
  it("renders all export buttons", () => {
    render(
      <CalendarPdfExportButtons
        dailyData={dailyData}
        weeklyData={weeklyData}
        monthlyData={monthlyData}
        courseData={courseData}
      />
    );

    expect(screen.getByText("Export Daily PDF")).toBeInTheDocument();
    expect(screen.getByText("Export Weekly PDF")).toBeInTheDocument();
    expect(screen.getByText("Export Monthly PDF")).toBeInTheDocument();
    expect(screen.getByText("Export Entire Course PDF")).toBeInTheDocument();
  });

  it("triggers export handlers on button click", () => {
    console.log = jest.fn(); // Spy on console.log for confirmation

    render(
      <CalendarPdfExportButtons
        dailyData={dailyData}
        weeklyData={weeklyData}
        monthlyData={monthlyData}
        courseData={courseData}
      />
    );

    fireEvent.click(screen.getByText("Export Daily PDF"));
    fireEvent.click(screen.getByText("Export Weekly PDF"));
    fireEvent.click(screen.getByText("Export Monthly PDF"));
    fireEvent.click(screen.getByText("Export Entire Course PDF"));

    expect(console.log).toHaveBeenCalledWith("Exporting Daily View to PDF...");
    expect(console.log).toHaveBeenCalledWith("Exporting Weekly View to PDF...");
    expect(console.log).toHaveBeenCalledWith("Exporting Monthly View to PDF...");
    expect(console.log).toHaveBeenCalledWith("Exporting Entire Course to PDF...");
  });
});
