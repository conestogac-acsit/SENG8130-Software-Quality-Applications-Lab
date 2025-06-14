import React from "react";
import { Evaluation } from "./Evaluation";

interface CalendarDayCardProps {
    date: string;
    evaluations: Evaluation[];
}

const CalendarDayCard: React.FC<CalendarDayCardProps> = ({ date, evaluations }) => {
    return (
        <div className="bg-white shadow rounded p-4">
            <h2 className="text-xl font-bold mb-2">{date}</h2>

            {evaluations.length === 0 ? (
                <p className="text-sm text-gray-500 italic">No evaluations scheduled for this day.</p>
            ) : (
                <ul className="space-y-2">
                    {evaluations.map((ev, idx) => (
                        <li
                            key={idx}
                            className="border border-gray-200 rounded p-2 hover:bg-gray-50"
                        >
                            <div className="text-sm font-semibold">
                                {ev.title} ({ev.type})
                            </div>
                            <div className="text-xs text-gray-600">
                                Course: {ev.course} | Weight: {ev.weight}%
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default CalendarDayCard;
