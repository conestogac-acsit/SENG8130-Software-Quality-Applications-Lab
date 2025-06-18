export function getCalendarRange(year: number, month: number): Date[] {
  const startOfMonth = new Date(year, month - 1, 1);
  const endOfMonth = new Date(year, month, 0);

  const start = new Date(startOfMonth);
  const startWeekday = (start.getDay() + 6) % 7; // Shift so Monday = 0
  start.setDate(start.getDate() - startWeekday);

  const end = new Date(endOfMonth);
  const endWeekday = (end.getDay() + 6) % 7;
  end.setDate(end.getDate() + (6 - endWeekday));

  const dates: Date[] = [];
  const current = new Date(start);
  while (current <= end) {
    dates.push(new Date(current));
    current.setDate(current.getDate() + 1);
  }
  return dates;
}

export function formatDateToYYYYMMDD(date: Date): string {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const day = `${date.getDate()}`.padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function formatDayLabel(
  date: Date,
  selectedMonth: number
): string {
  const month = date.getMonth() + 1; // 0-based
  const day = date.getDate();
  return month === selectedMonth
    ? `${day}`
    : `${month}/${day}`;
}

export function isCurrentMonth(date: Date, targetMonth: number): boolean {
  return date.getMonth() + 1 === targetMonth;
}