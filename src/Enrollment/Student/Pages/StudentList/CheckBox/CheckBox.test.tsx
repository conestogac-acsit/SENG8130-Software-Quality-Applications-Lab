import React from "react";
import { render, fireEvent } from "@testing-library/react";
import CheckBox from "./CheckBox";

describe("Reusable Checkbox", () => {
  it("toggles correctly on click", () => {
    const { getByTestId, getByText } = render(<CheckBox />);
    const checkBox = getByTestId("reusable-checkbox");

    // Initial state: unchecked
    expect(checkBox).not.toBeChecked();
    expect(getByText("No")).toBeInTheDocument();

    // Click to check
    fireEvent.click(checkBox);
    expect(checkBox).toBeChecked();
    expect(getByText("Yes")).toBeInTheDocument();
  });
});