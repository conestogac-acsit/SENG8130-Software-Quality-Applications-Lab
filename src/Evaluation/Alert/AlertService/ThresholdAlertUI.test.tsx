import React from "react";
import { createRoot } from "react-dom/client";
import ThresholdAlertUI from "./ThresholdAlertUI";
import { Evaluation } from "../../EvaluationService";
import { setWeeklyThreshold } from "./AlertUtils";

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
    const root = createRoot(container);
    root.render(<ThresholdAlertUI evaluations={evals} />);
    expect(container.textContent).toMatch(/exceed the configured threshold/i);
  });

  it("hides alert when evaluations are below threshold", () => {
    setWeeklyThreshold(3);
    const root = createRoot(container);
    root.render(<ThresholdAlertUI evaluations={evals.slice(0, 2)} />);
    expect(container.textContent).not.toMatch(/exceed the configured threshold/i);
  });
});
