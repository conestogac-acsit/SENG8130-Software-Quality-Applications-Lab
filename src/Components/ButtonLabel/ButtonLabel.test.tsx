import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ButtonLabel from "./ButtonLabel";

describe("ButtonLabel component", () => {
  test("renders the given label immediately", () => {
    render(<ButtonLabel label="Enroll in GitHub" />);
    expect(screen.getByRole("button")).toHaveTextContent("Enroll in GitHub");
  });

  test("calls onClick handler when clicked", () => {
    const onClick = jest.fn();
    render(<ButtonLabel label="Enroll in GitHub" onClick={onClick} />);

    fireEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
