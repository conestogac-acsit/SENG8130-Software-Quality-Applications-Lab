import React, { useMemo } from 'react';

type WeekViewProps = {
  year: number;
  month: number;
};

function getMonthWeekRange(year: number, month: number): { start: Date; end: Date } {
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);

  const start = new Date(firstDayOfMonth);
  const dayOfWeekStart = (start.getDay() + 6) % 7;
  start.setDate(start.getDate() - dayOfWeekStart);

  const end = new Date(lastDayOfMonth);
  const dayOfWeekEnd = (end.getDay() + 6) % 7;
  end.setDate(end.getDate() + (6 - dayOfWeekEnd));

  return { start, end };
}

const WeekView: React.FC<WeekViewProps> = ({year, month}) => {
  const weeklyData = useMemo(() => {
    const { start, end } = getMonthWeekRange(year, month);
    const weeks: { weekLabel: string; count: number }[] = [];

    let cursor = new Date(start);
    while (cursor <= end) {
      const weekStart = new Date(cursor);
      const weekEnd = new Date(cursor);
      weekEnd.setDate(weekStart.getDate() + 6);

      const label = `${weekStart.toLocaleDateString()} - ${weekEnd.toLocaleDateString()}`;

      weeks.push({
        weekLabel: label,
        count: 0,
      });

      cursor.setDate(cursor.getDate() + 7);
    }

    return weeks;
  }, [year, month]);
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {weeklyData.map(({ weekLabel, count }) => (
        <div
          key={weekLabel}
          className={`rounded p-4 text-center shadow-sm ${
            count ? 'text-white' : 'text-gray-500'
          }`}
        >
          <div className="font-semibold">{weekLabel}</div>
          <div className="text-sm mt-1">{count} evaluations</div>
        </div>
      ))}
    </div>
  );
};

export default WeekView;
