import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import EvaluationForm from './EvaluationForm';

describe('EvaluationForm', () => {
  it('renders input fields', () => {
    render(<EvaluationForm onSave={() => {}} />);
    expect(screen.getByPlaceholderText('Course Code')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Evaluation Type')).toBeInTheDocument();
    expect(screen.getByDisplayValue('')).toBeInTheDocument();
  });

  it('shows validation error on submit with empty fields', () => {
    render(<EvaluationForm onSave={() => {}} />);
    fireEvent.click(screen.getByText('Submit'));
    expect(screen.getByText(/required/)).toBeInTheDocument();
  });
});