import React from "react";
import { render, screen } from "@testing-library/react";
import WeeklyView from "./WeeklyView";
import { Evaluation } from "../../EvaluationService";

describe("WeeklyView", () => {
    beforeAll(() => {
        jest
            .spyOn(Date, "now")
            .mockReturnValue(new Date("2025-07-16T12:00:00Z").valueOf());
    });

    afterAll(() => {
        jest.restoreAllMocks();
    });

    const mockEvaluations: Evaluation[] = [
        {
            course: "CS101",
            title: "Assignment 1",
            type: "Assignment",
            weight: 10,
            dueDate: new Date("2025-07-14T12:00:00"), // Monday
            instructor: "Dr. Smith",
            campus: "Main Campus",
        },
        {
            course: "CS102",
            title: "Quiz 1",
            type: "Quiz",
            weight: 5,
            dueDate: new Date("2025-07-16T12:00:00"), // Wednesday
            instructor: "Dr. Allen",
            campus: "Science Campus",
        },
    ];

    it("renders 7 day columns for a full week", () => {
        render(<WeeklyView evaluations={mockEvaluations} />);
        const gridCells = screen.getAllByRole("gridcell");
        expect(gridCells.length).toBe(7);
    });

    it("renders correct date labels for Monday to Sunday", () => {
        render(<WeeklyView evaluations={mockEvaluations} />);

        const monday = new Date("2025-07-14T12:00:00Z");

        for (let i = 0; i < 7; i++) {
            const date = new Date(monday);
            date.setDate(monday.getDate() + i);
            const expectedLabel = date.toDateString();
            expect(screen.getByText(expectedLabel)).toBeInTheDocument();
        }
    });

    it("renders evaluation titles correctly", () => {
        render(<WeeklyView evaluations={mockEvaluations} />);
        expect(screen.getByText(/Assignment 1/i)).toBeInTheDocument();
        expect(screen.getByText(/Quiz 1/i)).toBeInTheDocument();
    });

    it("renders evaluations on correct days", () => {
        render(<WeeklyView evaluations={mockEvaluations} />);

        const mondayCell = screen
            .getByText("Mon Jul 14 2025")
            .closest("div");
        expect(mondayCell).toHaveTextContent("Assignment 1");

        const wednesdayCell = screen
            .getByText("Wed Jul 16 2025")
            .closest("div");
        expect(wednesdayCell).toHaveTextContent("Quiz 1");
    });

    it("shows fallback message from CalendarDayCard for empty days", () => {
        render(<WeeklyView evaluations={mockEvaluations} />);
        const fallbacks = screen.queryAllByText(
            "No evaluations scheduled for this day."
        );
        expect(fallbacks.length).toBe(5);
    });
});