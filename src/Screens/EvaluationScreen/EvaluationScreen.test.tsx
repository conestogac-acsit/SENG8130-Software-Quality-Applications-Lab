import React from 'react';
import { render, screen } from '@testing-library/react';
import EvaluationScreen from './EvaluationScreen';

describe('EvaluationScreen', () => {
  it('renders the EvaluationForm component', () => {
    render(<EvaluationScreen />);
    expect(screen.getByPlaceholderText('Course Code')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Evaluation Type')).toBeInTheDocument();
  });

  it('displays header title', () => {
    render(<EvaluationScreen />);
    expect(screen.getByText(/SQATE Evaluation Entry/i)).toBeInTheDocument();
  });
});