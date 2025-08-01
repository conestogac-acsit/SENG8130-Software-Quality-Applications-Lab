import { render, screen } from "@testing-library/react";
import EvaluationAlert from "./EvaluationAlert";
import { Evaluation } from "../EvaluationService/EvaluationService";

describe("EvaluationAlert - Threshold Warning", () => {
  const sampleEvaluations: Evaluation[] = [
    {
      course: "Math 101",
      title: "Quiz 1",
      type: "Quiz",
      weight: 10,
      dueDate: new Date("2025-08-04"), 
      instructor: "John",
      campus: "Main"
    },
    {
      course: "Math 101",
      title: "Quiz 2",
      type: "Quiz",
      weight: 10,
      dueDate: new Date("2025-08-05"), 
      instructor: "Jane",
      campus: "Main"
    },
    {
      course: "Math 101",
      title: "Midterm",
      type: "Mid Exam",
      weight: 20,
      dueDate: new Date("2025-08-06"), 
      instructor: "Jack",
      campus: "Main"
    },
    {
      course: "Math 101",
      title: "Lab",
      type: "Practical Lab",
      weight: 15,
      dueDate: new Date("2025-08-07"), // Week 32
      instructor: "Jill",
      campus: "Main"
    },
    {
      course: "Science 201",
      title: "Quiz 1",
      type: "Quiz",
      weight: 10,
      dueDate: new Date("2025-08-14"), // Week 33
      instructor: "Jake",
      campus: "Main"
    }
  ];

  it("shows alert when evaluations in a week exceed threshold", () => {
    render(<EvaluationAlert evaluations={sampleEvaluations} threshold={3} />);
    expect(
      screen.getByText(/week 32 has too many evaluations/i)
    ).toBeInTheDocument();
  });

  it("does not show alert when no week exceeds threshold", () => {
    render(<EvaluationAlert evaluations={sampleEvaluations} threshold={5} />);
    expect(
      screen.queryByText(/has too many evaluations/i)
    ).not.toBeInTheDocument();
  });
});
