import { saveOrUpdateEvaluation } from './saveOrUpdateEvaluationService';
import type { uno } from './saveOrUpdateEvaluationService';

// Simulated in-memory storage for testing
let storedData: uno[] = [];

describe('saveOrUpdateEvaluation', () => {
  beforeEach(() => {
    storedData = []; // Reset between tests
  });

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

it('should update an existing evaluation if evaluationId matches', () => {
    const inputData: uno[] = [
      {
        evaluationId: 'abc123',
        courseCode: 'OLD',
        evaluationType: 'Assignment',
        dueDay: '2025-01-01'
      }
    ];

    const form: Partial<uno> = {
      evaluationId: 'abc123',
      courseCode: 'NEW',
      evaluationType: 'Quiz'
    };
    const date = '2025-07-01';

    const result = saveOrUpdateEvaluation(inputData, form, date, null, (data) => {
      storedData = data;
    });

    if (result.length !== 1) throw new Error('Evaluation count incorrect');
    if (result[0].courseCode !== 'NEW') throw new Error('Evaluation course code not updated');
    if (result[0].evaluationType !== 'Quiz') throw new Error('Evaluation type not updated');
    if (result[0].dueDay !== date) throw new Error('Evaluation date not updated');
  });
