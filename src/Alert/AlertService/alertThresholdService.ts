let weeklyThreshold = 10;

export function setWeeklyThreshold(value: number): void {
  if (value < 1) throw new Error("Threshold must be ≥ 1");
  weeklyThreshold = value;
}

export function getWeeklyThreshold(): number {
  return weeklyThreshold;
}