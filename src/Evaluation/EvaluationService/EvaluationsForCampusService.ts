import type { Evaluation } from './EvaluationService';

export enum Campus {
  Milton = "Milton",
  Waterloo = "Waterloo",
}

export function getEvaluationsForCampus(data: Evaluation[], campus: Campus): Evaluation[] {
  return data.filter(ev => ev.campus === campus);
}
