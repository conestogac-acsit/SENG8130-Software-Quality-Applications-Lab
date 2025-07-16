import { getEvaluationsForInstructor } from './EvaluationsForInstructorService';
import type { Evaluation } from './EvaluationService';

describe('getEvaluationsForInstructor', () => {
  const evaluations: Evaluation[] = [
    { 
      course: 'Math', 
      title: 'Quiz 1', 
      type: 'Quiz', 
      weight: 10, 
      dueDate: new Date('2025-07-20'), 
      instructor: 'Dr. Smith', 
      campus: 'Main' 
    },
    { 
      course: 'Science', 
      title: 'Lab 1', 
      type: 'Practical Lab', 
      weight: 15, 
      dueDate: new Date('2025-07-21'), 
      instructor: 'Dr. Adams', 
      campus: 'North' 
    },
    { 
      course: 'Math', 
      title: 'Assignment 1', 
      type: 'Assignment', 
      weight: 20, 
      dueDate: new Date('2025-07-22'), 
      instructor: 'Dr. Smith', 
      campus: 'Main' 
    }
  ];

  it('should return evaluations for the given instructor', () => {
    const result = getEvaluationsForInstructor(evaluations, 'Dr. Smith');
    expect(result.length).toBe(2);
    expect(result[0].instructor).toBe('Dr. Smith');
    expect(result[1].instructor).toBe('Dr. Smith');
  });

  it('should return an empty array if no evaluations match the instructor', () => {
    const result = getEvaluationsForInstructor(evaluations, 'Dr. Jones');
    expect(result).toEqual([]);
  });

  it('should throw error if instructor argument is invalid', () => {
    expect(() => getEvaluationsForInstructor(evaluations, '')).toThrow('Invalid instructor');
    expect(() => getEvaluationsForInstructor(evaluations, null as unknown as string)).toThrow('Invalid instructor');
    expect(() => getEvaluationsForInstructor(evaluations, undefined as unknown as string)).toThrow('Invalid instructor');
  });
});
