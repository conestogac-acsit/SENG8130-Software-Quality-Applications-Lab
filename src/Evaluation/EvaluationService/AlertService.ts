export function generateAlertMessage(week: number, count: number, threshold: number): string | null {
  if (count > threshold) {
    return ` Week ${week} has ${count} evaluations scheduled – exceeds the threshold of ${threshold}!`;
  }
  return null;
}
