import { render, screen } from "@testing-library/react";
import CalendarView from "./CalendarView";
import { Evaluation } from "./Evaluation";

const formatter = new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "America/Toronto",
});

const mockEvaluations: Evaluation[] = [
    {
        course: "CS101",
        title: "Quiz 1",
        type: "Quiz",
        weight: 10,
        dueDate: new Date("2025-06-10T12:00:00"),
    },
    {
        course: "CS102",
        title: "Midterm",
        type: "Exam",
        weight: 30,
        dueDate: new Date("2025-06-12T12:00:00"),
    },
];

describe("CalendarView", () => {
    it("renders a CalendarDayCard for each unique date", () => {
        render(<CalendarView evaluations={mockEvaluations} />);

        const headingElements = screen.getAllByRole("heading", { level: 2 });

        const expectedDates = [
            formatter.format(new Date("2025-06-10T12:00:00")),
            formatter.format(new Date("2025-06-12T12:00:00")),
        ];

        const renderedDates = headingElements.map((el) => el.textContent?.trim());

        console.log(">>> renderedDates:", renderedDates);
        console.log(">>> expectedDates:", expectedDates);

        expect(renderedDates).toEqual(expect.arrayContaining(expectedDates));
    });

    it("renders evaluations under the correct date", () => {
        render(<CalendarView evaluations={mockEvaluations} />);
        expect(screen.getByText("Quiz 1 (Quiz)")).toBeInTheDocument();
        expect(screen.getByText("Midterm (Exam)")).toBeInTheDocument();
    });

    it("shows a message when no evaluations are provided", () => {
        render(<CalendarView evaluations={[]} />);
        expect(screen.getByText(/no evaluations scheduled/i)).toBeInTheDocument();
    });

});
