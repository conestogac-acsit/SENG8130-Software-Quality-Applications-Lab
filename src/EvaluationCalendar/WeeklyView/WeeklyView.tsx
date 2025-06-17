import React from "react";

// For now, reusing the same type inline (or import from types/Evaluation.ts)
type Evaluation = {
  course: string;
  title: string;
  type: "Assignment" | "Mid Exam" | "Quiz" | "Project" | "Practical Lab" | "Final Exam";
  weight: number;
  dueDate: Date;
};

interface WeeklyViewProps {
  evaluations: Evaluation[];
  startDate: Date; // start of the week
}

const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const WeeklyView: React.FC<WeeklyViewProps> = ({ evaluations, startDate }) => {
  const start = new Date(startDate);
  const weekDates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(start);
    date.setDate(start.getDate() + i);
    return date;
  });

  const evaluationsByDay = weekDates.map((day) => {
    const dateKey = day.toDateString();
    return {
      date: dateKey,
      evaluations: evaluations.filter((ev) => ev.dueDate.toDateString() === dateKey),
    };
  });

  return (
    <div className="grid grid-cols-7 gap-4">
      {evaluationsByDay.map(({ date, evaluations }, idx) => (
        <div key={date} className="bg-gray-50 p-2 rounded shadow">
          <h3 className="text-sm font-bold text-center">
            {daysOfWeek[idx]} <br /> {date}
          </h3>

          {evaluations.length === 0 ? (
            <p className="text-xs text-gray-500 italic text-center mt-2">No evaluations</p>
          ) : (
            <ul className="mt-2 space-y-1">
              {evaluations.map((ev, index) => (
                <li key={index} className="text-xs bg-white border p-1 rounded">
                  <span className="font-semibold">{ev.title}</span> ({ev.type})<br />
                  <span className="text-gray-600">Course: {ev.course} | Weight: {ev.weight}%</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

export default WeeklyView;