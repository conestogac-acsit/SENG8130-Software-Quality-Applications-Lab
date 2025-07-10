import React from 'react';
import { render, screen } from '@testing-library/react';
import WeekView from './WeekView';
import { Evaluation } from '../../EvaluationService';

describe('WeekView', () => {
  const year = 2025;
  const month = 6;