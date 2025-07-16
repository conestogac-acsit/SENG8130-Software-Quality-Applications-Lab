import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { WorkloadAccuracyMeter } from './WorkloadAccuracyMeter';

describe('WorkloadAccuracyMeter Component', () => {
  test('renders the title and accuracy text', () => {
    render(<WorkloadAccuracyMeter accuracy={85} />);
    expect(screen.getByText('🎯 Accuracy Rate')).toBeInTheDocument();
    expect(screen.getByText('85% accurate workload prediction')).toBeInTheDocument();
  });

  test('renders a progress bar with correct width', () => {
    render(<WorkloadAccuracyMeter accuracy={60} />);
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveStyle('width: 60%');
  });

  test('progress bar has correct class and styling', () => {
    render(<WorkloadAccuracyMeter accuracy={90} />);
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveClass('bg-green-500');
    expect(progressBar).toHaveStyle('width: 90%');
  });
});
