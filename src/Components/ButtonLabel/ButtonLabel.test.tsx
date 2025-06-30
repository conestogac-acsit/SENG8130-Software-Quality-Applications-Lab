import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import ButtonLabel from "./ButtonLabel";

describe("ButtonLabel component", () => {
  test("renders loading first then label", async () => {
    jest.useFakeTimers();

    render(<ButtonLabel label="Test Button" />);

    // Initially shows Loading...
    expect(screen.getByRole("button")).toHaveTextContent("Loading...");

    // Wrap runAllTimers inside act and await to let React update
    await act(async () => {
      jest.runAllTimers();
    });

    expect(screen.getByRole("button")).toHaveTextContent("Test Button");

    jest.useRealTimers();
  });

  test("calls onClick handler when clicked", async () => {
    jest.useFakeTimers();

    const onClick = jest.fn();
    render(<ButtonLabel label="Click Me" onClick={onClick} />);

    // Advance timers inside act
    await act(async () => {
      jest.runAllTimers();
    });

    fireEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledTimes(1);

    jest.useRealTimers();
  });
});
