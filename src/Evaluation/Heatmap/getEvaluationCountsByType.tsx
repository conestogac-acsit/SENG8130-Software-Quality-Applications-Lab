import { Evaluation, EvaluationType } from "../EvaluationService";

export function getEvaluationCountsByType(evaluations: Evaluation[]): Record<EvaluationType, number> {
  const counts: Record<EvaluationType, number> = {
    Assignment: 0,
    'Mid Exam': 0,
    Quiz: 0,
    Project: 0,
    'Practical Lab': 0,
    'Final Exam': 0,
  };

  evaluations.forEach((e) => {
    counts[e.type]++;
  });

  return counts;
}