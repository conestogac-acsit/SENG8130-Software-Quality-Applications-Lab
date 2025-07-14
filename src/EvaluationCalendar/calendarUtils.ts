import {
  startOfWeek,
  startOfMonth,
  endOfMonth,
  endOfWeek,
  addDays,
  format,
  parseISO,
} from "date-fns";

export function getWeekDates(startDate: string): string[] {
  const start = startOfWeek(parseISO(startDate), { weekStartsOn: 1 });
  return Array.from({ length: 7 }).map((_, i) =>
    format(addDays(start, i), "yyyy-MM-dd")
  );
}

export function getMonthGrid(year: number, month: number): string[] {
  const startDate = startOfWeek(startOfMonth(new Date(year, month)), {
    weekStartsOn: 1,
  });
  const endDate = endOfWeek(endOfMonth(new Date(year, month)), {
    weekStartsOn: 1,
  });

  const days: string[] = [];
  let curr = startDate;

  while (curr <= endDate) {
    days.push(format(curr, "yyyy-MM-dd"));
    curr = addDays(curr, 1);
  }

  return days;
}

export function formatDateRange(startDate: string): string {
  const weekDates = getWeekDates(startDate);
  return `${formatDate(weekDates[0])} – ${formatDate(weekDates[6])}`;
}

function formatDate(dateStr: string): string {
  const date = parseISO(dateStr);
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

export function formatMonthLabel(year: number, month: number): string {
  return new Date(year, month).toLocaleString("en-US", {
    month: "long",
    year: "numeric",
  });
}
