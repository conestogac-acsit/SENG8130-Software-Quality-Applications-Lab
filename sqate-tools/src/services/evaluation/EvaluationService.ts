import { Evaluation } from '../../models/Evaluation';
import { DailyEvaluation } from '../../models/DailyEvaluation';

// Interface for evaluation-related data services
export interface EvaluationService {
  // Load all evaluations from a CSV file
  getAllEvaluations(fileName: string): Promise<Evaluation[]>;

  // Get daily evaluations for a given week starting from the specified date (YYYY-MM-DD)
  getDayEvaluationsByWeek(startDay: string): Promise<DailyEvaluation[]>;
}