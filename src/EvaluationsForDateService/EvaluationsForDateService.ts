export interface Moo {
  evaluationId: string;
  courseCode: string;
  evaluationType: string;
  dueDay?: string;
}

export function getEvaluationsForDate(data: Moo[], date: string): Moo[] {
  return data.filter(ev => ev.dueDay?.trim().slice(0, 10) === date);
}