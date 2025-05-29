import { Evaluation } from './Evaluation';

// the information of a day and all evaluations in that day
export interface DailyEvaluation {
  year: number; // Calendar year (e.g., 2025)
  month: number; // Month of the year (1 = January, 12 = December)
  day: number; // Day of the month (1–31)
  evaluations: Evaluation[]; // List of evaluations scheduled for this day
}
