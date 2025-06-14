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
    describe('saveEvaluationsFromStorage', () => {
        it('stores JSON string in localStorage', () => {
          saveEvaluationsFromStorage(mockData);
          const stored = localStorage.getItem('uploaded-eval-data');
    
          expect(stored).not.toBeNull();
          expect(JSON.parse(stored!)).toEqual(mockData);
        });
      });
      describe('loadEvaluationsFromStorage', () => {
        it('loads evaluations from localStorage', () => {
          localStorage.setItem('uploaded-eval-data', JSON.stringify(mockData));
          const loaded = loadEvaluationsFromStorage();
    
          expect(loaded).toEqual(mockData);
        });
    
        it('returns empty array if nothing in localStorage', () => {
          const result = loadEvaluationsFromStorage();
          expect(result).toEqual([]);
        });
    
        it('returns empty array and logs error if JSON is invalid', () => {
          const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
          localStorage.setItem('uploaded-eval-data', 'invalid_json');
    
          const result = loadEvaluationsFromStorage();
          expect(result).toEqual([]);
          expect(spy).toHaveBeenCalledWith(
            '[loadEvaluationsFromStorage] Failed to parse:',
            expect.any(SyntaxError)
          );
    
          spy.mockRestore();
        });
      });
});