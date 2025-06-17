import React from "react";

type Evaluation = {
  course: string;
  title: string;
  type: "Assignment" | "Mid Exam" | "Quiz" | "Project" | "Practical Lab" | "Final Exam";
  weight: number;
  dueDate: Date;
};

interface MonthlyViewProps {
  evaluations: Evaluation[];
  month: number; // 0-indexed (e.g., June = 5)
  year: number;
}

const daysInWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const MonthlyView: React.FC<MonthlyViewProps> = ({ evaluations, month, year }) => {
  const firstDayOfMonth = new Date(year, month, 1);
  const firstWeekday = firstDayOfMonth.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const calendarCells: { date: Date; evaluations: Evaluation[] }[] = [];

  // Empty cells before the 1st day of the month
  for (let i = 0; i < firstWeekday; i++) {
    calendarCells.push({ date: new Date(NaN), evaluations: [] });
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const currentDate = new Date(year, month, day);
    const dateKey = currentDate.toDateString();
    const dayEvaluations = evaluations.filter(
      (ev) => ev.dueDate.toDateString() === dateKey
    );
    calendarCells.push({ date: currentDate, evaluations: dayEvaluations });
  }

  return (
    <div className="space-y-2">
      <div className="grid grid-cols-7 text-center font-bold text-sm">
        {daysInWeek.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {calendarCells.map(({ date, evaluations }, idx) => (
          <div
            key={idx}
            role="gridcell"
            className="border min-h-[80px] p-1 text-xs rounded"
          >
            {!isNaN(date.getTime()) && (
              <div className="font-semibold">{date.getDate()}</div>
            )}
            <ul className="mt-1 space-y-1">
              {evaluations.map((ev, i) => (
                <li key={i} className="bg-gray-100 p-1 rounded">
                  <div className="font-medium">{ev.title}</div>
                  <div className="text-gray-600">{ev.course}</div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MonthlyView;