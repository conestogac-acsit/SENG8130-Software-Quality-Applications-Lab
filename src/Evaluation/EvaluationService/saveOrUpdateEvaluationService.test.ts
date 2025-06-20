import { saveOrUpdateEvaluation } from './saveOrUpdateEvaluationService';
import type { Evaluation, IEvaluationService } from '.';

describe('saveOrUpdateEvaluation', () => {
  let storedData: Evaluation[];

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

    const service: IEvaluationService = {
      saveEvaluations: (data: Evaluation[]) => {
        storedData = data;
      },
      loadEvaluations: () => storedData,
    };

    const result = saveOrUpdateEvaluation(inputData, form, date, null, service);

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
    storedData = [...inputData];

    const form: Partial<Evaluation> = {
      course: 'MATH101',
      title: 'Midterm',
      type: 'Mid Exam',
      weight: 25,
      instructor: 'New Instructor',
      campus: 'New Campus'
    };
    const date = '2025-07-01';

    const service: IEvaluationService = {
      saveEvaluations: (data: Evaluation[]) => {
        storedData = data;
      },
      loadEvaluations: () => storedData,
    };

    const result = saveOrUpdateEvaluation(inputData, form, date, null, service);

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

    const service: IEvaluationService = {
      saveEvaluations: (data: Evaluation[]) => {
        storedData = data;
      },
      loadEvaluations: () => storedData,
    };

    saveOrUpdateEvaluation(inputData, form, date, null, service);

    if (storedData.length !== 1) throw new Error('Data was not saved to storage');
    if (storedData[0].course !== 'ENG2020') throw new Error('Stored course incorrect');
  });

  it('throws an error when saving evaluations fails', () => {
    const errorService: IEvaluationService = {
      saveEvaluations: () => {
        throw new Error('Simulated save error');
      },
      loadEvaluations: () => []
    };

    const form: Partial<Evaluation> = {
      course: 'ERROR101',
      title: 'Failure',
      type: 'Quiz',
      weight: 0,
      instructor: 'Nobody',
      campus: 'Nowhere'
    };
    const date = '2025-10-10';

    try {
      saveOrUpdateEvaluation([], form, date, null, errorService);
      throw new Error('Expected error not thrown');
    } catch (err: any) {
      if (err.message !== 'Simulated save error') {
        throw new Error('Unexpected error message: ' + err.message);
      }
    }
  });

  it('throws an error when load evaluations fails', () => {
    const errorService: IEvaluationService = {
      saveEvaluations: (data: Evaluation[]) => {
        storedData = data;
      },
      loadEvaluations: () => {
        throw new Error('Simulated load error');
      }
    };

    const form: Partial<Evaluation> = {
      course: 'LOADERR',
      title: 'Should Fail',
      type: 'Quiz',
      weight: 10,
      instructor: 'No one',
      campus: 'Nowhere'
    };
    const date = '2025-10-11';

    try {
      saveOrUpdateEvaluation([], form, date, null, errorService);
      throw new Error('Expected load error not thrown');
    } catch (err: any) {
      if (err.message !== 'Simulated load error') {
        throw new Error('Unexpected error message: ' + err.message);
      }
    }
  });
});
