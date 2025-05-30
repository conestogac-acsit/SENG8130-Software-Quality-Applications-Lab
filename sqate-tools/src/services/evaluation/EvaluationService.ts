import { Evaluation } from '../../models/Evaluation';
import { DailyEvaluation } from '../../models/DailyEvaluation';

// Interface for evaluation-related data services
export interface EvaluationService {
  /**
   * Retrieves heatmap data grouped by week.
   * 
   * @param startDay - (Optional) The start date in 'YYYY-MM-DD' format. 
   *                   If not provided, the current date will be used as reference.
   * @returns A promise that resolves to an array of daily evaluations.
   */
  getHeatMapDataByWeek(startDay?: string): Promise<DailyEvaluation[]>;

  /**
   * Retrieves heatmap data grouped by month.
   * 
   * @param startDay - (Optional) The start date in 'YYYY-MM-DD' format. 
   *                   If not provided, the current date will be used as reference.
   * @returns A promise that resolves to an array of daily evaluations.
   */
  getHeatMapDataByMonth(startDay?: string): Promise<DailyEvaluation[]>;

  /**
   * Loads and parses evaluation data from a CSV file.
   * 
   * @param fileName - The path or name of the CSV file to be uploaded.
   * @param type - (Optional) View type for heatmap data processing.
   *               Should be one of the values from the `HeatMapViewType` enum:
   *               - HeatMapViewType.MONTH ("month")
   *               - HeatMapViewType.WEEK ("week")
   * @returns A promise that resolves to an array of daily evaluations.
   */
  uploadCsvFile(fileName: string, type?: string): Promise<DailyEvaluation[]>;
}