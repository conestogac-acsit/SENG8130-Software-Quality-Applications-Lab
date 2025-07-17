import { useState } from "react";
import {
    startOfWeek,
    addWeeks,
    addMonths,
    startOfMonth,
    format,
} from "date-fns";

export function useCalendarNavigation() {

    const [startDate, setStartDate] = useState<Date>(
        startOfWeek(new Date(), { weekStartsOn: 1 })
    );

    const [year, setYear] = useState<number>(
        new Date().getFullYear()
    );
    const [month, setMonth] = useState<number>(
        new Date().getMonth()
    );

    function navigateWeek(direction: "prev" | "next") {
        setStartDate((prev) =>
            addWeeks(prev, direction === "next" ? 1 : -1)
        );
    }

    function navigateMonth(direction: "prev" | "next") {
        setMonth((prevMonth) => {
            const newDate = addMonths(
                new Date(year, prevMonth, 1),
                direction === "next" ? 1 : -1
            );
            setYear(newDate.getFullYear());
            return newDate.getMonth();
        });
    }

    function getLabel(view: "weekly" | "monthly"): string {
        if (view === "weekly") {
            const weekStart = startDate;
            const weekEnd = addWeeks(weekStart, 1);
            return `Week of ${format(weekStart, "MMM d")} – ${format(
                addWeeks(weekStart, 1),
                "MMM d"
            )}`;
        } else {
            const monthStart = startOfMonth(
                new Date(year, month, 1)
            );
            return format(monthStart, "MMMM yyyy");
        }
    }

    return {
        startDate,
        year,
        month,
        navigateWeek,
        navigateMonth,
        getLabel,
    };
}
