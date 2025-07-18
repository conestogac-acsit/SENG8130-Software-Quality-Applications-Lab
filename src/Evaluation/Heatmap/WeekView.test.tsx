import React from 'react';
import { render, screen } from '@testing-library/react';
import WeekView from './WeekView';

describe('WeekView', () => {
  it('renders correct number of weekly blocks for July 2025', () => {
    render(<WeekView year={2025} month={6} />);
    const weekLabels = screen.getAllByText(/evaluations$/);
    expect(weekLabels.length).toBeGreaterThanOrEqual(4);
  });
});