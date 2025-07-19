import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SuggestiveEvaluationDashboard } from './SuggestiveEvaluationDashboard';

// ✅ Mock the inner component to isolate Dashboard behavior
jest.mock('../Components/WorkloadAccuracyMeter', () => ({
  WorkloadAccuracyMeter: ({ accuracy }: { accuracy: number }) => (
    <div data-testid="mock-meter">{accuracy}%</div>
  )
}));

describe('SuggestiveEvaluationDashboard', () => {
  test('renders WorkloadAccuracyMeter with given accuracy', () => {
    render(<SuggestiveEvaluationDashboard accuracy={75} />);
    const meter = screen.getByTestId('mock-meter');
    expect(meter).toBeInTheDocument();
    expect(meter).toHaveTextContent('75%');
  });

  test('centers the meter in the view using Tailwind layout classes', () => {
    render(<SuggestiveEvaluationDashboard accuracy={100} />);
    const container = screen.getByTestId('dashboard-container');

    expect(container).toHaveClass('flex');
    expect(container).toHaveClass('items-center');
    expect(container).toHaveClass('justify-center');
  });
});
