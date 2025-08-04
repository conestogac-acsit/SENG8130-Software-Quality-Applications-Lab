import { render, screen } from "@testing-library/react";
import ErrorBoundary from './ErrorBoundary';
import React from "react";
import { MemoryRouter } from "react-router-dom";

const ProblemChild = () => {
  throw new Error("Test error");
};

describe("ErrorBoundary", () => {
  it("should render fallback UI when child throws error", () => {
    render(
      <MemoryRouter>
        <ErrorBoundary>
          <ProblemChild />
        </ErrorBoundary>
      </MemoryRouter>
    );

    expect(screen.getByText("Oops! Something went wrong.")).toBeInTheDocument();
    expect(screen.getByRole('button', { name: "Go Back Home" })).toBeInTheDocument();
  });

  it("should render children when no error is thrown", () => {
    render(
      <MemoryRouter>
        <ErrorBoundary>
          <div>Safe content</div>
        </ErrorBoundary>
      </MemoryRouter>
    );

    expect(screen.getByText("Safe content")).toBeInTheDocument();
  });
});
