import React, { useMemo, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CalendarDayCard from "../../../Components/CalendarDayCard/CalendarDayCard";
import { Evaluation, EvaluationService } from "../../EvaluationService";
import { LocalStorage } from "../../../localStorageService/LocalStorage";

const evaluationService = new EvaluationService(new LocalStorage());

const CalendarView: React.FC = () => {
  const [evaluations, setEvaluations] = useState<Evaluation[]>([]);

  useEffect(() => {
    const loaded = evaluationService.loadEvaluations();
    setEvaluations(loaded);
  }, []);

  const { groupedByDate, sortedDates } = useMemo(() => {
    const grouped: Record<string, Evaluation[]> = {};
    evaluations.forEach((ev) => {
      const dateKey = new Intl.DateTimeFormat("en-US", {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
        timeZone: "America/Toronto",
      }).format(new Date(ev.dueDate));

      if (!grouped[dateKey]) grouped[dateKey] = [];
      grouped[dateKey].push(ev);
    });

    const sorted = Object.keys(grouped).sort(
      (a, b) => new Date(a).getTime() - new Date(b).getTime()
    );

    return { groupedByDate: grouped, sortedDates: sorted };
  }, [evaluations]);

  return (
    <div className="p-6 space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Evaluation Calendar</h2>
        <Link
          to="/dashboard/evaluation-form"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Add Evaluation
        </Link>
      </div>

      {sortedDates.length === 0 ? (
        <p className="text-center text-gray-500">No evaluations scheduled</p>
      ) : (
        sortedDates.map((dateStr) => (
          <CalendarDayCard
            key={dateStr}
            date={dateStr}
            evaluations={groupedByDate[dateStr]}
          />
        ))
      )}
    </div>
  );
};

export default CalendarView;
