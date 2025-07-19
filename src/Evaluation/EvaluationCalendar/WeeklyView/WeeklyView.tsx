import React, { useMemo } from "react";
import { Evaluation } from "../../EvaluationService";
import { format } from "date-fns";

interface WeeklyViewProps {
  evaluations: Evaluation[];
}

const DATE_FORMAT = "EEE MMM dd yyyy";

const getStartOfWeek = (date: Date): Date => {
  const day = date.getDay(); // 0 (Sun) to 6 (Sat)
  const diff = (day === 0 ? -6 : 1) - day; // Shift to Monday
  const start = new Date(date);
  start.setDate(start.getDate() + diff);
  start.setHours(0, 0, 0, 0);
  return start;
};

const addDays = (date: Date, days: number): Date => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

const WeeklyView: React.FC<WeeklyViewProps> = ({ evaluations }) => {
  const startOfWeek = useMemo(() => {
    if (evaluations.length === 0) {
      return getStartOfWeek(new Date()); // fallback to current week
    }

    const earliest = new Date(
      Math.min(...evaluations.map((ev) => ev.dueDate.getTime()))
    );
    return getStartOfWeek(earliest);
  }, [evaluations]);

  const daysOfWeek = useMemo(
    () => Array.from({ length: 7 }, (_, i) => addDays(startOfWeek, i)),
    [startOfWeek]
  );

  return (
    <div className="grid grid-cols-7 gap-4">
      {daysOfWeek.map((day) => {
        const dateStr = format(day, DATE_FORMAT);

        const dailyEvaluations = evaluations.filter(
          (ev) => format(ev.dueDate, DATE_FORMAT) === dateStr
        );

        return (
          <div key={dateStr} role="gridcell" className="bg-white shadow rounded p-4">
            <h2 className="text-xl font-bold mb-2">{dateStr}</h2>
            {dailyEvaluations.length > 0 ? (
              <ul className="space-y-2">
                {dailyEvaluations.map((ev, index) => (
                  <li
                    key={index}
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
            ) : (
              <p className="text-sm text-gray-500 italic">
                No evaluations scheduled for this day.
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default WeeklyView;
