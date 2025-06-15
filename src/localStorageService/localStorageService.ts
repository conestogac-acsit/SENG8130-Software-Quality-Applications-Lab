// evaluation-storage.ts

import type { EvaluationRow } from '../Evaluation/EvaluationDaily/Types/EvaluationTypes';

export function loadEvaluationsFromStorage(): EvaluationRow[] {
    const raw = localStorage.getItem('uploaded-eval-data');
    if (!raw) return [];
  
    try {
      return JSON.parse(raw) as EvaluationRow[];
    } catch (err) {
      console.error('[loadEvaluationsFromStorage] Failed to parse:', err);
      return [];
    }
  }
  
  export function saveEvaluationsFromStorage(data: EvaluationRow[]): void {
    localStorage.setItem('uploaded-eval-data', JSON.stringify(data)); // Save parsed data
  }