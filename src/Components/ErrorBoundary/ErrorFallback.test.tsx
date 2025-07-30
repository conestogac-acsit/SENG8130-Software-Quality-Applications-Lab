import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ErrorFallback from "./ErrorFallback";
import { MemoryRouter } from "react-router-dom";

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("ErrorFallback", () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it("renders the error message and button", () => {
    render(
      <MemoryRouter>
        <ErrorFallback onReset={() => {}} />
      </MemoryRouter>
    );

    expect(screen.getByText("Oops! Something went wrong.")).toBeInTheDocument();
    expect(
      screen.getByText(
        "We're sorry for the inconvenience. Please try refreshing the page or return to the homepage."
      )
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Go Back Home" })).toBeInTheDocument();
  });

  it("calls onReset and navigates on button click", () => {
    const mockReset = jest.fn();

    render(
      <MemoryRouter>
        <ErrorFallback onReset={mockReset} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole("button", { name: "Go Back Home" }));

    expect(mockReset).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });
});
