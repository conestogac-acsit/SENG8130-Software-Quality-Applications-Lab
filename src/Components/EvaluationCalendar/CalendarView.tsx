import React from "react";
import { Evaluation } from "./Evaluation"
import CalendarDayCard from "./CalendarDayCard";

interface CalendarViewProps {
    evaluations: Evaluation[];
}

const CalendarView: React.FC<CalendarViewProps> = ({ evaluations }) => {
    const groupedByDate = evaluations.reduce<Record<string, Evaluation[]>>((acc, ev) => {
        const key = new Intl.DateTimeFormat("en-US", {
            weekday: "short",
            year: "numeric",
            month: "short",
            day: "numeric",
            timeZone: "America/Toronto",
        }).format(ev.dueDate);
        if (!acc[key]) acc[key] = [];
        acc[key].push(ev);
        return acc;
    }, {});

    const sortedDates = Object.keys(groupedByDate).sort(
        (a, b) => new Date(a).getTime() - new Date(b).getTime()
    );

    return (
        <div className="space-y-4">
            {sortedDates.length === 0 ? (
                <p className="text-gray-500 italic">No evaluations scheduled.</p>
            ) : (
                sortedDates.map((date) => (
                    <CalendarDayCard
                        key={date}
                        date={date}
                        evaluations={groupedByDate[date]}
                    />
                ))
            )}
        </div>
    );
};

export default CalendarView;
