import React from 'react';
import { render, screen } from '@testing-library/react';
import WeekView from './WeekView';
import { Evaluation } from '../../EvaluationService';

describe('WeekView', () => {
  const year = 2025;
  const month = 6;

const createEval = (dateStr: string): Evaluation => ({
    course: 'Test Course',
    title: 'Test Title',
    type: 'Quiz',
    weight: 10,
    dueDate: new Date(dateStr),
    instructor: 'X',
    campus: 'Main',
  });

  const mockEvaluations: Evaluation[] = [
    createEval('2025-06-30'),
    createEval('2025-07-01'),
    createEval('2025-07-03'),
    createEval('2025-07-10'),
    createEval('2025-07-15'),
    createEval('2025-07-24'),
    createEval('2025-07-31'),
    createEval('2025-08-01'),
  ];