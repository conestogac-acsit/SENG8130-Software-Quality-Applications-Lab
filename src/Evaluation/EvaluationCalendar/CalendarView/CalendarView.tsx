import React, { useMemo } from "react";
import CalendarDayCard from "../../../Components/CalendarDayCard/CalendarDayCard";
import { Evaluation } from "../../EvaluationService";

interface CalendarViewProps {
  evaluations: Evaluation[];
  onDelete: (ev: Evaluation) => void;
}

const CalendarView: React.FC<CalendarViewProps> = ({ evaluations, onDelete }) => {
  const { groupedByDate, sortedDates } = useMemo(() => {
    const grouped: Record<string, Evaluation[]> = {};

    evaluations.forEach((ev) => {
      const dateKey = new Intl.DateTimeFormat("en-US", {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
        timeZone: "America/Toronto",
      }).format(ev.dueDate);

      if (!grouped[dateKey]) grouped[dateKey] = [];
      grouped[dateKey].push(ev);
    });

    const sorted = Object.keys(grouped).sort(
      (a, b) => new Date(a).getTime() - new Date(b).getTime()
    );

    return { groupedByDate: grouped, sortedDates: sorted };
  }, [evaluations]);

  if (sortedDates.length === 0) {
    return <p className="text-center text-gray-500">No evaluations scheduled</p>;
  }

  return (
    <div className="space-y-4">
      {sortedDates.map((dateStr) => (
        <div key={dateStr} className="border rounded p-2">
          <h2 className="font-semibold">{dateStr}</h2>
          <ul>
            {groupedByDate[dateStr].map((ev) => (
              <li key={ev.evaluationId} className="flex justify-between items-center">
                <CalendarDayCard
                  date={dateStr}
                  evaluations={[ev]}
                />
                <button
                  onClick={() => onDelete(ev)}
                  className="bg-red-500 text-white px-2 py-1 rounded text-sm ml-2"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default CalendarView;