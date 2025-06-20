import React, { useMemo } from "react";
import CalendarDayCard from "../../Components/CalendarDayCard";
import { Evaluation } from "../../Evaluation/EvaluationService";

interface WeeklyViewProps {
  evaluations: Evaluation[];
  startDate: Date;
}

const WeeklyView: React.FC<WeeklyViewProps> = ({ evaluations, startDate }) => {
  const weekData = useMemo(() => {
    const weekDates = Array.from({ length: 7 }, (_, i) => {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      return date;
    });

    const evaluationsByDay = weekDates.map((date) => {
      const dateKey = date.toDateString();
      const dayEvaluations = evaluations.filter(
        (ev) => new Date(ev.dueDate).toDateString() === dateKey
      );
      return { date: dateKey, evaluations: dayEvaluations };
    });

    return evaluationsByDay;
  }, [evaluations, startDate]);

  return (
    <div className="grid grid-cols-7 gap-4">
      {weekData.map(({ date, evaluations }) => (
        <div key={date} role="gridcell">
          <CalendarDayCard date={date} evaluations={evaluations} />
        </div>
      ))}
    </div>
  );
};

export default WeeklyView;
