import { saveOrUpdateEvaluation } from './saveOrUpdateEvaluationService';
import type { uno } from './saveOrUpdateEvaluationService';

// Simulated in-memory storage for testing
let storedData: uno[] = [];

it('should add a new evaluation if it does not exist', () => {
  const inputData: uno[] = [];
  const form: Partial<uno> = {
    courseCode: 'SENG8130',
    evaluationType: 'Test'
  };
  const date = '2025-06-18';

  const result = saveOrUpdateEvaluation(inputData, form, date, null, (data) => {
    storedData = data;
  });

  if (result.length !== 1) throw new Error('Evaluation was not added');
  if (result[0].courseCode !== 'SENG8130') throw new Error('Course code mismatch');
  if (result[0].dueDay !== date) throw new Error('Date mismatch');
});
