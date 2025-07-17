import React, { useMemo } from "react";
import CalendarDayCard from "../../../Components/CalendarDayCard";
import { Evaluation } from "../../EvaluationService";

interface MonthlyViewProps {
  evaluations: Evaluation[];
  month: number; 
  year: number;
}

const daysInWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const MonthlyView: React.FC<MonthlyViewProps> = ({ evaluations, month, year }) => {
  const firstDayOfMonth = useMemo(() => new Date(year, month, 1), [month, year]);
  const firstWeekday = useMemo(() => firstDayOfMonth.getDay(), [firstDayOfMonth]);
  const daysInMonth = useMemo(
    () => new Date(year, month + 1, 0).getDate(),
    [month, year]
  );

  const calendarCells = useMemo(() => {
    const cells: { date: Date; evaluations: Evaluation[] }[] = [];

    for (let i = 0; i < firstWeekday; i++) {
      cells.push({ date: new Date(NaN), evaluations: [] });
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const currentDate = new Date(year, month, day);
      const dateKey = currentDate.toDateString();

      const dayEvaluations = evaluations.filter(
        (ev) => new Date(ev.dueDate).toDateString() === dateKey
      );

      cells.push({ date: currentDate, evaluations: dayEvaluations });
    }

    return cells;
  }, [evaluations, firstWeekday, daysInMonth, month, year]);

  const hasAnyEvaluations = calendarCells.some((cell) => cell.evaluations.length > 0);

  return (
    <div className="space-y-2">
      {!hasAnyEvaluations && (
        <div className="text-center text-gray-500 italic p-2">
          No evaluations are scheduled for this month.
        </div>
      )}

      <div className="grid grid-cols-7 text-center font-bold text-sm">
        {daysInWeek.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {calendarCells.map(({ date, evaluations }, idx) => (
          <div key={idx} role="gridcell">
            {!isNaN(date.getTime()) ? (
              <CalendarDayCard
                date={date.toDateString()}
                evaluations={evaluations}
              />
            ) : (
              <div className="min-h-[80px] p-1 text-xs rounded bg-transparent" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MonthlyView;