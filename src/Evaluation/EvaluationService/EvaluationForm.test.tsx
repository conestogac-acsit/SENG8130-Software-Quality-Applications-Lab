import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import EvaluationForm from './EvaluationForm';

describe('EvaluationForm', () => {
  it('renders all form fields and submit button', () => {
    render(
      <MemoryRouter>
        <EvaluationForm />
      </MemoryRouter>
    );

    expect(screen.getByPlaceholderText('Course')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Title')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Weight (%)')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Instructor')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Campus')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /save evaluation/i })).toBeInTheDocument();
  });

  it('accepts input and updates state', () => {
    render(
      <MemoryRouter>
        <EvaluationForm />
      </MemoryRouter>
    );

    const courseInput = screen.getByPlaceholderText('Course');
    fireEvent.change(courseInput, { target: { value: 'SENG8130' } });
    expect(courseInput).toHaveValue('SENG8130');

    const titleInput = screen.getByPlaceholderText('Title');
    fireEvent.change(titleInput, { target: { value: 'Midterm' } });
    expect(titleInput).toHaveValue('Midterm');

    const instructorInput = screen.getByPlaceholderText('Instructor');
    fireEvent.change(instructorInput, { target: { value: 'John Doe' } });
    expect(instructorInput).toHaveValue('John Doe');

    const campusInput = screen.getByPlaceholderText('Campus');
    fireEvent.change(campusInput, { target: { value: 'Doon' } });
    expect(campusInput).toHaveValue('Doon');

    const weightInput = screen.getByPlaceholderText('Weight (%)');
    fireEvent.change(weightInput, { target: { value: '25' } });
    expect(weightInput).toHaveValue(25);
  });
});
