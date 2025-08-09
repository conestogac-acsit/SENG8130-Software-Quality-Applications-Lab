import React from "react";
import { render, screen } from "@testing-library/react";
import { WorkloadAccuracyMeter } from "./WorkloadAccuracyMeter";
import "@testing-library/jest-dom";

// Helper to get the inner progress bar
const getProgressBar = () => screen.getByRole("progressbar");

describe("WorkloadAccuracyMeter", () => {
  it("renders 100% accuracy when predictions match actuals", () => {
    const evaluations = [
      { predictedWorkload: 100, actualWorkload: 100 },
      { predictedWorkload: 80, actualWorkload: 80 },
    ] as any; // cast to match extended EvaluationWithWorkload

    render(<WorkloadAccuracyMeter evaluations={evaluations} />);

    expect(screen.getByText(/100% accurate workload prediction/i)).toBeInTheDocument();
    expect(getProgressBar()).toHaveStyle("width: 100%");
  });

  it("calculates and renders average accuracy correctly", () => {
    const evaluations = [
      { predictedWorkload: 90, actualWorkload: 100 }, // 90%
      { predictedWorkload: 70, actualWorkload: 100 }, // 70%
    ] as any;

    render(<WorkloadAccuracyMeter evaluations={evaluations} />);

    expect(screen.getByText(/80% accurate workload prediction/i)).toBeInTheDocument();
    expect(getProgressBar()).toHaveStyle("width: 80%");
  });

  it("shows 0% accuracy when there are no valid evaluations", () => {
    const evaluations = [
      { predictedWorkload: "bad", actualWorkload: "bad" }, // invalid
    ] as any;

    render(<WorkloadAccuracyMeter evaluations={evaluations} />);

    expect(screen.getByText(/0% accurate workload prediction/i)).toBeInTheDocument();
    expect(getProgressBar()).toHaveStyle("width: 0%");
  });

  it("renders correctly with empty evaluation list", () => {
    render(<WorkloadAccuracyMeter evaluations={[]} />);
    expect(screen.getByText(/0% accurate workload prediction/i)).toBeInTheDocument();
    expect(getProgressBar()).toHaveStyle("width: 0%");
  });
});
