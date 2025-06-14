import {
    loadEvaluationsFromStorage,
    saveEvaluationsFromStorage
  } from './evaluation-storage';
  import type { EvaluationRow } from '../Types/EvaluationTypes';
  
  describe('evaluation-storage', () => {
    const mockData: EvaluationRow[] = [
      {
        evaluation_id: 'abc',
        course_code: 'INFO1001',
        evaluation_type: 'Assignment',
        due_day: '2025-06-10'
      }
    ];
  
    beforeEach(() => {
      localStorage.clear();
      jest.clearAllMocks();
    });
  });
  