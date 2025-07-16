import React from "react";
import { render } from "react-dom";
import ThresholdAlertUI from "./ThresholdAlertUI";
import { Evaluation } from "../../Evaluation/EvaluationService";
import { setWeeklyThreshold } from "./AlertThresholdService";

describe("ThresholdAlertUI", () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
    container.remove();
  });

  const evals: Evaluation[] = [
    { course: "A", title: "Eval 1", type: "Quiz", weight: 10, dueDate: new Date("2025-09-08"), instructor: "", campus: "" },
    { course: "B", title: "Eval 2", type: "Quiz", weight: 10, dueDate: new Date("2025-09-08"), instructor: "", campus: "" },
    { course: "C", title: "Eval 3", type: "Quiz", weight: 10, dueDate: new Date("2025-09-08"), instructor: "", campus: "" }
  ];

  it("shows alert when evaluations exceed threshold", () => {
    setWeeklyThreshold(2);
    render(<ThresholdAlertUI evaluations={evals} />, container);
    expect(container.textContent).toMatch(/exceed the configured threshold/i);
  });

  it("hides alert when evaluations are below threshold", () => {
    setWeeklyThreshold(1);
    render(<ThresholdAlertUI evaluations={evals.slice(0, 2)} />, container);
    expect(container.textContent).not.toMatch(/exceed the configured threshold/i);
  });
});