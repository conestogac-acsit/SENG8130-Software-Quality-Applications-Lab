import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CalendarPdfExportButtons from "./CalendarPdfExportButtons";

describe("CalendarPdfExportButtons", () => {
  it("calls correct handlers when buttons are clicked", () => {
    const handleDaily = jest.fn();
    const handleWeekly = jest.fn();
    const handleMonthly = jest.fn();
    const handleCourse = jest.fn();

    render(
      <CalendarPdfExportButtons
        onExportDaily={handleDaily}
        onExportWeekly={handleWeekly}
        onExportMonthly={handleMonthly}
        onExportCourse={handleCourse}
      />
    );

    fireEvent.click(screen.getByText("Export Daily PDF"));
    expect(handleDaily).toHaveBeenCalled();

    fireEvent.click(screen.getByText("Export Weekly PDF"));
    expect(handleWeekly).toHaveBeenCalled();

    fireEvent.click(screen.getByText("Export Monthly PDF"));
    expect(handleMonthly).toHaveBeenCalled();

    fireEvent.click(screen.getByText("Export Entire Course PDF"));
    expect(handleCourse).toHaveBeenCalled();
  });
});