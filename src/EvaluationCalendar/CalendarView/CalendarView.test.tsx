import { render, screen } from "@testing-library/react";
import CalendarView from "./CalendarView";

describe("CalendarView", () => {
  const mockEvaluations = [
  {
    course: "CS101",
    title: "Quiz 1",
    type: "Quiz" as const,
    weight: 10,
    dueDate: new Date("2025-06-10T12:00:00"),
  },
  {
    course: "CS102",
    title: "Midterm",
    type: "Final Exam" as const,
    weight: 30,
    dueDate: new Date("2025-06-12T12:00:00"),
  },
];

  it("renders a CalendarDayCard for each unique date", () => {
    render(<CalendarView evaluations={mockEvaluations} />);
    const headings = screen.getAllByRole("heading", { level: 2 });
    expect(headings.length).toBe(2);
  });

  it("renders evaluations under the correct date", () => {
    render(<CalendarView evaluations={mockEvaluations} />);
    expect(screen.getByText("Quiz 1 (Quiz)")).toBeInTheDocument();
    expect(screen.getByText("Midterm (Final Exam)")).toBeInTheDocument();
  });

  it('displays "No evaluations scheduled" if no evaluations are provided', () => {
    render(<CalendarView evaluations={[]} />);
    expect(screen.getByText("No evaluations scheduled")).toBeInTheDocument();
  });
});
