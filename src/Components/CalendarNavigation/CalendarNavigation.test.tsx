import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import CalendarNavigation from "./CalendarNavigation";

describe("CalendarNavigation", () => {
    const mockPrev = jest.fn();
    const mockNext = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
        render(
            <CalendarNavigation
                label="Week of July 7 - July 13"
                onPrev={mockPrev}
                onNext={mockNext}
            />
        );
    });

    it("renders Prev and Next buttons", () => {
        expect(screen.getByRole("button", { name: /prev/i })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /next/i })).toBeInTheDocument();
    });

    it("renders the label text", () => {
        expect(screen.getByText("Week of July 7 - July 13")).toBeInTheDocument();
    });

    it("calls onPrev when Prev button is clicked", () => {
        fireEvent.click(screen.getByRole("button", { name: /prev/i }));
        expect(mockPrev).toHaveBeenCalledTimes(1);
    });

    it("calls onNext when Next button is clicked", () => {
        fireEvent.click(screen.getByRole("button", { name: /next/i }));
        expect(mockNext).toHaveBeenCalledTimes(1);
    });
});
