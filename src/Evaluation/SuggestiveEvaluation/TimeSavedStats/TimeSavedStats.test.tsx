import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TimeSavedStats } from './TimeSavedStats';

describe('TimeSavedStats Component', () => {
  test('renders title correctly', () => {
    render(<TimeSavedStats hours={12} />);
    expect(screen.getByText('⏱️ Time Saved')).toBeInTheDocument();
  });

  test('renders correct hours message', () => {
    render(<TimeSavedStats hours={10} />);
    expect(
      screen.getByText('Estimated 10 hours saved using smart scheduling.')
    ).toBeInTheDocument();
  });

  test('updates message when hours prop changes', () => {
    const { rerender } = render(<TimeSavedStats hours={5} />);
    expect(
      screen.getByText('Estimated 5 hours saved using smart scheduling.')
    ).toBeInTheDocument();

    rerender(<TimeSavedStats hours={8} />);
    expect(
      screen.getByText('Estimated 8 hours saved using smart scheduling.')
    ).toBeInTheDocument();
  });
});