import React from 'react';
import { render, screen } from '@testing-library/react';
import MonthView from './MonthView';

describe('MonthView', () => {
  it('renders 12 month blocks', () => {
    render(<MonthView />);
    const blocks = screen.getAllByText(/evaluations/);
    expect(blocks).toHaveLength(12);
  });
});