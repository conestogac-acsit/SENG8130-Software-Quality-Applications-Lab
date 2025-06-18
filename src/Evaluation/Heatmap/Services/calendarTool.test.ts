import { getCalendarRange, formatDateToYYYYMMDD, formatDayLabel } from './calendarTool';

describe('getCalendarRange', () => {
  it('should return a range starting from Monday and ending on Sunday', () => {
    const range = getCalendarRange(2024, 4);
    expect(range[0].getDay()).toBe(1);
    expect(range[range.length - 1].getDay()).toBe(0);
  });

  it('should include all days of the specified month', () => {
    const range = getCalendarRange(2024, 4);
    const days = range.map(d => d.getDate());
    expect(days).toContain(1);
    expect(days).toContain(30);
  });

  
});

describe('formatDateToYYYYMMDD', () => {
  it('should format date to yyyy-mm-dd', () => {
    const date = new Date(2024, 3, 5);
    const formatted = formatDateToYYYYMMDD(date);
    expect(formatted).toBe('2024-04-05');
  });
});

describe('formatDayLabel', () => {
  it('should return just the day if month matches', () => {
    const date = new Date(2024, 3, 5);
    const label = formatDayLabel(date, 4);
    expect(label).toBe('5');
  });

  it('should return month/day if month differs', () => {
    const date = new Date(2024, 2, 31);
    const label = formatDayLabel(date, 4);
    expect(label).toBe('3/31');
  });
  
  it('should handle single-digit days correctly', () => {
    const date = new Date(2024, 3, 1);
    const label = formatDayLabel(date, 4);
    expect(label).toBe('1');
  });

  it('should handle month transition correctly', () => {
    const date = new Date(2024, 2, 31);
    const label = formatDayLabel(date, 4);
    expect(label).toBe('3/31');
  });

  it('should handle February dates correctly', () => {
    const date = new Date(2024, 1, 29);
    const label = formatDayLabel(date, 2);
    expect(label).toBe('29');
  });
});