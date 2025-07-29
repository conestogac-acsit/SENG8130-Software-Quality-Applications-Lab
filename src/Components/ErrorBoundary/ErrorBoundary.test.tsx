import { render, screen } from "@testing-library/react";
import ErrorBoundary from './ErrorBoundary';
import React from "react";

const ProblemChild = () => {
  throw new Error("Test error");
};

describe("ErrorBoundary", () => {
  it("should render fallback UI when child throws error", () => {
    render(
      <ErrorBoundary>
        <ProblemChild />
      </ErrorBoundary>
    );
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
  });
});