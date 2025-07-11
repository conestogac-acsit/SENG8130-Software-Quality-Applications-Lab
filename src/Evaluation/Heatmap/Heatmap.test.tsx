import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Heatmap from "./Heatmap";
import { Evaluation } from "../EvaluationService";

describe("Heatmap Component", () => {
  const mockEvaluations: Evaluation[] = [
    {
      course: "Math",
      title: "Midterm",
      type: "Mid Exam",
      weight: 30,
      dueDate: new Date("2025-07-03"),
      instructor: "X",
      campus: "Main",
    },
    {
      course: "History",
      title: "Essay",
      type: "Assignment",
      weight: 10,
      dueDate: new Date("2025-07-10"),
      instructor: "Y",
      campus: "North",
    },
    {
      course: "Physics",
      title: "Quiz",
      type: "Quiz",
      weight: 5,
      dueDate: new Date("2025-07-15"),
      instructor: "Z",
      campus: "Main",
    },
  ];

  it("renders year dropdown and month view by default", () => {
    render(<Heatmap evaluations={mockEvaluations} />);

    expect(screen.getByLabelText(/Year:/)).toBeInTheDocument();
    expect(screen.getByText(/Switch to Week View/i)).toBeInTheDocument();
    expect(screen.getAllByText(/evaluations/).length).toBeGreaterThan(0);
  });

  it("switches to week view and shows month selector", () => {
    render(<Heatmap evaluations={mockEvaluations} />);

    const toggleButton = screen.getByRole("button", {
      name: /Switch to Week View/i,
    });
    fireEvent.click(toggleButton);

    expect(screen.getByLabelText(/Month:/)).toBeInTheDocument();
    expect(screen.getByText(/Switch to Month View/i)).toBeInTheDocument();
  });

  it("displays evaluations based on selected year and month", () => {
    render(<Heatmap evaluations={mockEvaluations} />);

    fireEvent.click(
      screen.getByRole("button", { name: /Switch to Week View/i })
    );
    fireEvent.change(screen.getByLabelText(/Year:/), {
      target: { value: "2025" },
    });
    fireEvent.change(screen.getByLabelText(/Month:/), {
      target: { value: "6" },
    }); // July = 6

    const countElements = screen.getAllByText(/evaluations$/);
    const counts = countElements.map((el) => el.textContent?.trim());

    expect(counts).toContain("3 evaluations");
  });

  it("returns to month view when toggled back", () => {
    render(<Heatmap evaluations={mockEvaluations} />);

    const toggleButton = screen.getByRole("button", {
      name: /Switch to Week View/i,
    });
    fireEvent.click(toggleButton);

    fireEvent.click(
      screen.getByRole("button", { name: /Switch to Month View/i })
    );

    expect(screen.queryByLabelText(/Month:/)).not.toBeInTheDocument();
  });
});
