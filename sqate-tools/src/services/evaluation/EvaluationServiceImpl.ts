import { Evaluation } from '../../models/Evaluation';
import { DailyEvaluation } from '../../models/DailyEvaluation';
import { EvaluationService } from './EvaluationService';

// the implementation of EvaluationService
export class EvaluationServiceImpl implements EvaluationService {
  async getAllEvaluations(fileName: string): Promise<Evaluation[]> {
    // TODO: implement CSV parsing logic here
    return [];
  }

  async getDayEvaluationsByWeek(startDay: string): Promise<DailyEvaluation[]> {
    // TODO: implement evaluation grouping logic by week
    return [];
  }
}