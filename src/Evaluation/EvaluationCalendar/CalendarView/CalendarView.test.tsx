import React from "react";
import { render, screen } from "@testing-library/react";
import CalendarView from "./CalendarView";
import { Evaluation } from "../../EvaluationService";

// Mock child components
jest.mock("../WeeklyView/WeeklyView", () => () => <div data-testid="weekly-view">Weekly View</div>);
jest.mock("../../../Components/CalendarDayCard/CalendarDayCard", () => ({ date, evaluations }: any) => (
    <div data-testid="calendar-day-card">{date}</div>
));

const mockEvaluations: Evaluation[] = [
    {
        course: "CS101",
        title: "Assignment 1",
        type: "Assignment",
        weight: 10,
        dueDate: new Date("2025-07-14T12:00:00"),
        instructor: "Dr. Smith",
        campus: "Main Campus",
    },
    {
        course: "CS102",
        title: "Quiz 1",
        type: "Quiz",
        weight: 5,
        dueDate: new Date("2025-07-16T12:00:00"),
        instructor: "Dr. Allen",
        campus: "Science Campus",
    },
];

describe("CalendarView", () => {
    it("renders WeeklyView when viewMode is 'weekly'", () => {
        render(<CalendarView evaluations={mockEvaluations} viewMode="weekly" />);
        expect(screen.getByTestId("weekly-view")).toBeInTheDocument();
    });

    it("renders CalendarDayCards when viewMode is 'calendar'", () => {
        render(<CalendarView evaluations={mockEvaluations} viewMode="calendar" />);
        const dayCards = screen.getAllByTestId("calendar-day-card");
        expect(dayCards.length).toBeGreaterThan(0);
    });

    it("renders fallback message when no evaluations are passed", () => {
        render(<CalendarView evaluations={[]} viewMode="calendar" />);
        expect(screen.getByText("No evaluations scheduled")).toBeInTheDocument();
    });
});
