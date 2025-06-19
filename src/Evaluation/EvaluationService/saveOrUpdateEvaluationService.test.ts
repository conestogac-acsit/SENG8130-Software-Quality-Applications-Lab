import { saveOrUpdateEvaluation } from './saveOrUpdateEvaluationService';
import type { Evaluation, IEvaluationService } from '.';

let storedData: Evaluation[] = [];

const mockService: IEvaluationService = {
  saveEvaluations: (data: Evaluation[]) => {
    storedData = data;
  },
  loadEvaluations: () => {
    return storedData;
  }
};

describe('saveOrUpdateEvaluation', () => {
  beforeEach(() => {
    storedData = [];
  });

  it('should add a new evaluation if it does not exist', () => {
    const inputData: Evaluation[] = [];

    const form: Partial<Evaluation> = {
      course: 'PROG8051',
      title: 'Test 1',
      type: 'Quiz',
      weight: 10,
      instructor: 'Prof. Jane',
      campus: 'Main'
    };
    const date = '2025-06-18';

    const result = saveOrUpdateEvaluation(inputData, form, date, null, mockService);

    if (result.length !== 1) throw new Error('Evaluation was not added');
    if (result[0].course !== 'PROG8051') throw new Error('Course mismatch');
    if (result[0].dueDate.toISOString().slice(0, 10) !== date) throw new Error('Date mismatch');
  });

  it('should update an existing evaluation if course, title, and type match', () => {
    const inputData: Evaluation[] = [
      {
        course: 'MATH101',
        title: 'Midterm',
        type: 'Mid Exam',
        weight: 20,
        dueDate: new Date('2025-01-01'),
        instructor: 'Old Instructor',
        campus: 'Old Campus'
      }
    ];

    const form: Partial<Evaluation> = {
      course: 'MATH101',
      title: 'Midterm',
      type: 'Mid Exam',
      weight: 25,
      instructor: 'New Instructor',
      campus: 'New Campus'
    };
    const date = '2025-07-01';

    const result = saveOrUpdateEvaluation(inputData, form, date, null, mockService);

    if (result.length !== 1) throw new Error('Evaluation count incorrect');
    if (result[0].weight !== 25) throw new Error('Weight not updated');
    if (result[0].instructor !== 'New Instructor') throw new Error('Instructor not updated');
    if (result[0].campus !== 'New Campus') throw new Error('Campus not updated');
    if (result[0].dueDate.toISOString().slice(0, 10) !== date) throw new Error('Due date not updated');
  });

  it('should save updated data to storage using saveEvaluations', () => {
    const inputData: Evaluation[] = [];

    const form: Partial<Evaluation> = {
      course: 'ENG2020',
      title: 'Essay',
      type: 'Assignment',
      weight: 15,
      instructor: 'Dr. Adams',
      campus: 'Downtown'
    };
    const date = '2025-09-01';

    saveOrUpdateEvaluation(inputData, form, date, null, mockService);

    if (storedData.length !== 1) throw new Error('Data was not saved to storage');
    if (storedData[0].course !== 'ENG2020') throw new Error('Stored course incorrect');
  });
});
