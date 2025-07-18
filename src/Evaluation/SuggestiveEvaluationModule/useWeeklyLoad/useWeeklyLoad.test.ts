import { renderHook } from '@testing-library/react';
import { useWeeklyLoad } from './useWeeklyLoad';
import { Evaluation } from '../../EvaluationService/EvaluationService';

const mockEvals: Evaluation[] = [
  {
    course: 'Math101',
    title: 'Assignment 1',
    type: 'Assignment',
    weight: 10,
    dueDate: new Date('2025-09-08'), 
    instructor: 'Dr. Smith',
    campus: 'North',
  },
  {
    course: 'Math101',
    title: 'Quiz 1',
    type: 'Quiz',
    weight: 5,
    dueDate: new Date('2025-09-08'), 
    instructor: 'Dr. Smith',
    campus: 'North',
  },
  {
    course: 'CS201',
    title: 'Midterm',
    type: 'Mid Exam',
    weight: 30,
    dueDate: new Date('2025-09-29'), 
    instructor: 'Prof. Lee',
    campus: 'East',
  }
];

describe('useWeeklyLoad', () => {
  test('returns grouped evaluations by week with load count', () => {
    const { result } = renderHook(() => useWeeklyLoad(mockEvals));

    const loads = result.current.map(w => w.load);
    expect(loads).toContain(2); 
    expect(loads).toContain(1); 

    expect(result.current.length).toBe(2);
  });

  test('returns empty array if no evaluations', () => {
    const { result } = renderHook(() => useWeeklyLoad([]));
    expect(result.current).toEqual([]);
  });
});
