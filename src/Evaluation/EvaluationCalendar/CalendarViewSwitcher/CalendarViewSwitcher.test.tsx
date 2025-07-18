import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CalendarViewSwitcher from "./CalendarViewSwitcher";

describe("CalendarViewSwitcher", () => {
  const setViewMock = jest.fn();

  beforeEach(() => {
    setViewMock.mockClear();
  });

  it("renders both Weekly and Monthly buttons", () => {
    render(<CalendarViewSwitcher currentView="weekly" setView={setViewMock} />);

    expect(screen.getByText("Weekly")).toBeInTheDocument();
    expect(screen.getByText("Monthly")).toBeInTheDocument();
  });

  it("applies active style to the selected view (weekly)", () => {
    render(<CalendarViewSwitcher currentView="weekly" setView={setViewMock} />);

    const weeklyWrapper = screen.getByText("Weekly").parentElement;
    const monthlyWrapper = screen.getByText("Monthly").parentElement;

    expect(weeklyWrapper).toHaveClass("bg-blue-600");
    expect(monthlyWrapper).toHaveClass("bg-gray-200");
  });

  it("applies active style to the selected view (monthly)", () => {
    render(<CalendarViewSwitcher currentView="monthly" setView={setViewMock} />);

    const weeklyWrapper = screen.getByText("Weekly").parentElement;
    const monthlyWrapper = screen.getByText("Monthly").parentElement;

    expect(monthlyWrapper).toHaveClass("bg-blue-600");
    expect(weeklyWrapper).toHaveClass("bg-gray-200");
  });

  it("calls setView with 'weekly' when Weekly is clicked", () => {
    render(<CalendarViewSwitcher currentView="monthly" setView={setViewMock} />);
    fireEvent.click(screen.getByText("Weekly"));
    expect(setViewMock).toHaveBeenCalledWith("weekly");
  });

  it("calls setView with 'monthly' when Monthly is clicked", () => {
    render(<CalendarViewSwitcher currentView="weekly" setView={setViewMock} />);
    fireEvent.click(screen.getByText("Monthly"));
    expect(setViewMock).toHaveBeenCalledWith("monthly");
  });
});
