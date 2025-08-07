import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import EvaluationCard from "./EvaluationCard";

jest.mock("../Evaluation/Heatmap", () => ({
  Heatmap: () => <div data-testid="mock-heatmap">Mock Heatmap</div>,
}));

jest.mock("../Evaluation/SuggestedEvaluation/SuggestedEvaluation", () => () => (
  <div data-testid="mock-suggested">Mock Suggested Evaluation</div>
));

jest.mock("../Evaluation/EvaluationService/EvaluationService", () => {
  return {
    EvaluationService: jest.fn().mockImplementation(() => ({
      loadEvaluations: () => [{ id: 1, name: "Test Evaluation" }],
    })),
  };
});

test("renders evaluation service card", () => {
  render(
    <MemoryRouter>
      <EvaluationCard />
    </MemoryRouter>
  );
  expect(screen.getByText(/Evaluation Service/i)).toBeInTheDocument();
});

test("renders evaluation heatmap card", () => {
  render(
    <MemoryRouter>
      <EvaluationCard />
    </MemoryRouter>
  );
  expect(screen.getByText(/Evaluation Heatmap/i)).toBeInTheDocument();
});

test("renders mocked lazy components", () => {
  render(
    <MemoryRouter>
      <EvaluationCard />
    </MemoryRouter>
  );

  expect(screen.getByTestId("mock-heatmap")).toBeInTheDocument();
  expect(screen.getByTestId("mock-suggested")).toBeInTheDocument();
});
