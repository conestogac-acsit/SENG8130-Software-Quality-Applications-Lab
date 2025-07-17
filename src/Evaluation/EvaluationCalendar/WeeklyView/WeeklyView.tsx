import React, { useMemo } from "react";
import CalendarDayCard from "../../../Components/CalendarDayCard";
import { Evaluation } from "../../EvaluationService";

interface WeeklyViewProps {
    evaluations: Evaluation[];
}

const WeeklyView: React.FC<WeeklyViewProps> = ({ evaluations }) => {
    const today = new Date();

    const getMonday = (date: Date) => {
        const day = date.getDay();
        const diff = day === 0 ? -6 : 1 - day;
        const monday = new Date(date);
        monday.setDate(date.getDate() + diff);
        return monday;
    };

    const startDate = getMonday(today);

    const evaluationsByDay = useMemo(() => {
        const weekDates = Array.from({ length: 7 }, (_, i) => {
            const date = new Date(startDate);
            date.setDate(startDate.getDate() + i);
            return date;
        });

        return weekDates.map((date) => {
            const dateKey = date.toDateString();
            const dayEvaluations = evaluations.filter(
                (ev) => new Date(ev.dueDate).toDateString() === dateKey
            );
            return { date: dateKey, evaluations: dayEvaluations };
        });
    }, [evaluations, startDate]);

    return (
        <div className="grid grid-cols-7 gap-4">
            {evaluationsByDay.map(({ date, evaluations }) => (
                <div key={date} role="gridcell">
                    <CalendarDayCard date={date} evaluations={evaluations} />
                </div>
            ))}
        </div>
    );
};

export default WeeklyView;