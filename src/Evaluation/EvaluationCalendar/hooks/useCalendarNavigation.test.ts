import { renderHook, act } from "@testing-library/react";
import { useCalendarNavigation } from "./useCalendarNavigation";

describe("useCalendarNavigation", () => {
    it("returns the current week start date initially", () => {
        const { result } = renderHook(() => useCalendarNavigation());

        const startDate = result.current.startDate;
        expect(startDate.getDay()).toBe(1);
    });

    it("navigates to next week correctly", () => {
        const { result } = renderHook(() => useCalendarNavigation());

        const initialDate = result.current.startDate;

        act(() => {
            result.current.navigateWeek("next");
        });

        const newDate = result.current.startDate;

        expect(newDate.getDate()).toBe(initialDate.getDate() + 7);
    });

    it("navigates to previous week correctly", () => {
        const { result } = renderHook(() => useCalendarNavigation());

        const initialDate = result.current.startDate;

        act(() => {
            result.current.navigateWeek("prev");
        });

        const newDate = result.current.startDate;

        expect(newDate.getDate()).toBe(initialDate.getDate() - 7);
    });

    it("returns a weekly label string", () => {
        const { result } = renderHook(() => useCalendarNavigation());

        const label = result.current.getLabel("weekly");

        expect(label).toMatch(/Week of/);
    });

    it("navigates to next month correctly", () => {
        const { result } = renderHook(() => useCalendarNavigation());

        const initialMonth = result.current.month;
        const initialYear = result.current.year;

        act(() => {
            result.current.navigateMonth("next");
        });

        const newMonth = result.current.month;
        const newYear = result.current.year;

        if (initialMonth === 11) {
            expect(newMonth).toBe(0);
            expect(newYear).toBe(initialYear + 1);
        } else {
            expect(newMonth).toBe(initialMonth + 1);
            expect(newYear).toBe(initialYear);
        }
    });

    it("navigates to previous month correctly", () => {
        const { result } = renderHook(() => useCalendarNavigation());

        const initialMonth = result.current.month;
        const initialYear = result.current.year;

        act(() => {
            result.current.navigateMonth("prev");
        });

        const newMonth = result.current.month;
        const newYear = result.current.year;

        if (initialMonth === 0) {
            expect(newMonth).toBe(11);
            expect(newYear).toBe(initialYear - 1);
        } else {
            expect(newMonth).toBe(initialMonth - 1);
            expect(newYear).toBe(initialYear);
        }
    });

    it("returns a monthly label string", () => {
        const { result } = renderHook(() => useCalendarNavigation());

        const label = result.current.getLabel("monthly");

        expect(label).toMatch(/^[A-Za-z]+\s\d{4}$/);
    });
});
