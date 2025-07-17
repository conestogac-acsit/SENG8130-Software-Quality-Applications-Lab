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

    expect(screen.getByText(/Weekly/i)).toBeInTheDocument();
    expect(screen.getByText(/Monthly/i)).toBeInTheDocument();
  });

  it("applies active style to the selected view", () => {
    const { rerender } = render(
      <CalendarViewSwitcher currentView="weekly" setView={setViewMock} />
    );

    const weeklyButton = screen.getByText("Weekly");
    const monthlyButton = screen.getByText("Monthly");

    expect(weeklyButton).toHaveClass("bg-blue-600");
    expect(monthlyButton).toHaveClass("bg-gray-200");

    rerender(<CalendarViewSwitcher currentView="monthly" setView={setViewMock} />);
    expect(monthlyButton).toHaveClass("bg-blue-600");
    expect(weeklyButton).toHaveClass("bg-gray-200");
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