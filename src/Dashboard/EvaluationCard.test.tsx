import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import EvaluationCard from "./EvaluationCard";

jest.mock("../Evaluation/EvaluationService/EvaluationService", () => {
  return {
    EvaluationService: jest.fn().mockImplementation(() => {
      return {
        loadEvaluations: jest.fn(() => [
          {
            title: "Midterm Exam",
            course: "Math 101",
            type: "Exam",
            weight: 30,
            dueDate: "2025-10-01",
            instructor: "Dr. Smith",
            campus: "Main",
          },
        ]),
      };
    }),
  };
});

jest.mock("../localStorageService", () => {
  return {
    LocalStorage: jest.fn(),
  };
});

describe("EvaluationCard", () => {
  test("renders summary card with evaluation count when not on /evaluation route", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <EvaluationCard />
      </MemoryRouter>
    );

    expect(screen.getByText(/Evaluation Service/i)).toBeInTheDocument();
    expect(screen.getByText(/1 evaluations available/i)).toBeInTheDocument();
    fireEvent.click(screen.getByText(/Evaluation Service/i));
  });

  test("navigates to /evaluation when summary card clicked", () => {
    const { container } = render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/" element={<EvaluationCard />} />
          <Route path="/evaluation" element={<div>Evaluation Page</div>} />
        </Routes>
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText(/Evaluation Service/i));
    expect(container.innerHTML).toMatch("Evaluation Page");
  });

  test("renders detailed evaluation table on /evaluation route", () => {
    render(
      <MemoryRouter initialEntries={["/evaluation"]}>
        <EvaluationCard />
      </MemoryRouter>
    );

    expect(screen.getByText(/Evaluations Details/i)).toBeInTheDocument();
    expect(screen.getByText("Midterm Exam")).toBeInTheDocument();
    expect(screen.getByText("Math 101")).toBeInTheDocument();
    expect(screen.getByText("Exam")).toBeInTheDocument();
    expect(screen.getByText("30")).toBeInTheDocument();
    expect(screen.getByText("Sep 30, 2025")).toBeInTheDocument();
    expect(screen.getByText("Dr. Smith")).toBeInTheDocument();
    expect(screen.getByText("Main")).toBeInTheDocument();
    const backButton = screen.getByRole("button", { name: /Back to Homepage/i });
    expect(backButton).toBeInTheDocument();

    fireEvent.click(backButton);
  });
});
