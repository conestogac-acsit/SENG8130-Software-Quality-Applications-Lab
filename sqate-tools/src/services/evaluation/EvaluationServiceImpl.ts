import fs from 'fs';
import path from 'path';
import Papa from 'papaparse';
import type { ParseError } from 'papaparse';
import { v4 as uuidv4 } from 'uuid';
import { Evaluation } from '../../models/Evaluation';
import { DailyEvaluation } from '../../models/DailyEvaluation';
import { EvaluationService } from './EvaluationService';
import { CsvHeader } from '../../constants/CsvHeader';
import { HeatMapViewType } from '../../constants/HeatMapViewType';

/**
 * Implementation of the EvaluationService interface.
 * Provides methods for loading evaluation data from CSV and retrieving heatmap data by week or month.
 */
export class EvaluationServiceImpl implements EvaluationService {
  private _evaluationsByDay: Map<string, Evaluation[]> = new Map(); // Grouped evaluations by day (key = 'YYYY-MM-DD')

  /**
   * Returns heatmap data for the week starting from the given date.
   */
  getHeatMapDataByWeek(startDay?: string): Promise<DailyEvaluation[]> {
    return this.getHeatMapDataByTypeAndStartDay(HeatMapViewType.WEEK, startDay);
  }

  /**
   * Returns heatmap data for the month starting from the given date.
   */
  getHeatMapDataByMonth(startDay?: string): Promise<DailyEvaluation[]> {
    return this.getHeatMapDataByTypeAndStartDay(HeatMapViewType.MONTH, startDay);
  }

  /**
   * Returns heatmap data between a calculated start and end date depending on the view type.
   * Data is aggregated per day within the calculated range.
   */
  getHeatMapDataByTypeAndStartDay(type: HeatMapViewType, startDay?: string): Promise<DailyEvaluation[]> {
    const { start, end } = this.getStartAndEndDay(type, startDay);
    const result: DailyEvaluation[] = [];

    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      const dateStr = d.toISOString().split('T')[0];
      const evaluations = this._evaluationsByDay.get(dateStr) ?? [];

      result.push({
        day: dateStr,
        evaluations: evaluations
      });
    }

    return Promise.resolve(result);
  }

  /**
   * Calculates the start and end date range based on view type.
   * - WEEK: Monday to Sunday of the given week.
   * - MONTH: Monday of the first week to Sunday of the last week of the month.
   * Returns today as fallback if the date is missing or invalid.
   */
  getStartAndEndDay(type: HeatMapViewType, startDay?: string): { start: Date; end: Date } {
    let date = startDay ? new Date(startDay) : new Date();
    if (isNaN(date.getTime())) {
      date = new Date();
    }

    const clone = new Date(date);
    let start: Date;
    let end: Date;

    if (type === HeatMapViewType.WEEK) {
      start = this.getMondayOfWeek(clone);
      end = new Date(start);
      end.setDate(start.getDate() + 6);
    } else if (type === HeatMapViewType.MONTH) {
      const firstDayOfMonth = new Date(clone.getFullYear(), clone.getMonth(), 1);
      const lastDayOfMonth = new Date(clone.getFullYear(), clone.getMonth() + 1, 0);
      start = this.getMondayOfWeek(firstDayOfMonth);
      end = this.getSundayOfWeek(lastDayOfMonth);
    } else {
      start = clone;
      end = clone;
    }

    return { start, end };
  }

  /**
   * Returns the Monday of the week for the given date.
   * Adjusts for Sunday being day 0.
   */
  getMondayOfWeek(date: Date): Date {
    const d = new Date(date);
    const day = d.getDay();
    const diff = day === 0 ? -6 : 1 - day;
    d.setDate(d.getDate() + diff);
    d.setHours(0, 0, 0, 0);
    return d;
  }

  /**
   * Returns the Sunday of the week for the given date.
   */
  getSundayOfWeek(date: Date): Date {
    const d = new Date(date);
    const day = d.getDay();
    const diff = day === 0 ? 0 : 7 - day;
    d.setDate(d.getDate() + diff);
    d.setHours(0, 0, 0, 0);
    return d;
  }

  /**
   * Loads evaluation data from a CSV file and organizes it by day.
   * Automatically parses fields and populates _evaluations and _evaluationsByDay.
   * @param fileName - The full path to the CSV file.
   * @param type - Optional view type ("week" or "month") to determine default heatmap range.
   */
  async uploadCsvFile(fileName: string, type?: string): Promise<DailyEvaluation[]> {
    const filePath = path.resolve(fileName);
    const fileContent = fs.readFileSync(filePath, 'utf-8');

    const parsed = Papa.parse(fileContent, {
      header: true,
      skipEmptyLines: true,
    });

    if (parsed.errors.length > 0) {
      const errorMessages = parsed.errors
        .map((err: ParseError) => `${err.message} (row ${err.row})`)
        .join('; ');
      throw new Error(`CSV parsing failed: ${errorMessages}`);
    }

    const rawData = parsed.data as any[];

    const parsedEvaluations: Evaluation[] = rawData.map((item) => {
      const dueDate = new Date(item[CsvHeader.DUE_DAY]);

      const evaluation: Evaluation = {
        id: uuidv4(),
        course_name: item[CsvHeader.COURSE_NAME],
        evaluation_type: item[CsvHeader.EVALUATION_TYPE],
        evaluation_weight: parseFloat(item[CsvHeader.EVALUATION_WEIGHT]),
        due_day: dueDate,
      };

      const dayKey = dueDate.toISOString().slice(0, 10);
      if (!this._evaluationsByDay.has(dayKey)) {
        this._evaluationsByDay.set(dayKey, []);
      }
      this._evaluationsByDay.get(dayKey)!.push(evaluation);

      return evaluation;
    });

    const viewType = (type as HeatMapViewType) ?? HeatMapViewType.MONTH;
    return this.getHeatMapDataByWeek(viewType);
  }
}
