import React from "react";
import { Evaluation } from "./Evaluation"
import CalendarDayCard from "./CalendarDayCard";

interface CalendarViewProps {
    evaluations: Evaluation[];
}

const CalendarView: React.FC<CalendarViewProps> = ({ evaluations }) => {
    const groupedByDate = evaluations.reduce<Record<string, Evaluation[]>>((acc, ev) => {
        const key = ev.dueDate.toDateString();
        if (!acc[key]) acc[key] = [];
        acc[key].push(ev);
        return acc;
    }, {});

    const sortedDates = Object.keys(groupedByDate).sort(
        (a, b) => new Date(a).getTime() - new Date(b).getTime()
    );

    return (
        <div className="space-y-4">
            {sortedDates.map((date) => (
                <CalendarDayCard
                    key={date}
                    date={date}
                    evaluations={groupedByDate[date]}
                />
            ))}
        </div>
    );
};

export default CalendarView;
