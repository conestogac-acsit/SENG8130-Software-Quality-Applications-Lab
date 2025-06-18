export interface EvaluationRow {
  evaluationId: string;
  courseCode: string;
  evaluationType: string;
  dueDay?: Date;
}

export function getEvaluationsForDate(data: EvaluationRow[], date: Date): EvaluationRow[] {
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    throw new Error('Invalid date object');
  }

  return data.filter(ev => ev.dueDay?.toDateString() === date.toDateString());
}