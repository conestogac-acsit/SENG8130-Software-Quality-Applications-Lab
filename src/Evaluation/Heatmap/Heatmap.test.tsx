import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Heatmap from "./Heatmap";

describe("Heatmap Component", () => {
  it("renders year dropdown and month view by default", () => {
    render(<Heatmap />);

    expect(screen.getByLabelText(/Year:/)).toBeInTheDocument();
    expect(screen.getByText(/Switch to\s+Week View/i)).toBeInTheDocument();
  });

  it("switches to week view and shows month selector", () => {
    render(<Heatmap />);

    const toggleButton = screen.getByRole("button", {
      name: /Switch to Week View/i,
    });
    fireEvent.click(toggleButton);

    expect(screen.getByLabelText(/Month:/)).toBeInTheDocument();
    expect(screen.getByText(/Switch to Month View/i)).toBeInTheDocument();
  });

  it("returns to month view when toggled back", () => {
    render(<Heatmap />);

    const toggleButton = screen.getByRole("button", {
      name: /Switch to Week View/i,
    });
    fireEvent.click(toggleButton);

    fireEvent.click(
      screen.getByRole("button", { name: /Switch to Month View/i })
    );

    expect(screen.queryByLabelText(/Month:/)).not.toBeInTheDocument();
  });
});
