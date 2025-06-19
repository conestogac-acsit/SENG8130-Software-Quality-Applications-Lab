import React from "react";
import { render, screen } from "@testing-library/react";
import WeekdayHeader from "./WeekdayHeader";

describe("WeekdayHeader", () => {
  it("renders all 7 days of the week", () => {
    render(<WeekdayHeader />);
    const expectedDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    expectedDays.forEach((day) => {
      expect(screen.getByText(day)).toBeInTheDocument();
    });
  });

  it("renders in a 7-column grid", () => {
    const { container } = render(<WeekdayHeader />);
    const grid = container.firstChild;
    expect(grid).toHaveClass("grid-cols-7");
  });
});
