import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import EditEvaluationScreen from './EditEvaluationScreen';
import '@testing-library/jest-dom';

describe('EditEvaluationScreen Component', () => {
  test('renders form and components', () => {
    render(<EditEvaluationScreen />);
    expect(screen.getByText('Edit Evaluation')).toBeInTheDocument();
    expect(screen.getByLabelText('Evaluation Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Select New Date')).toBeInTheDocument();
    expect(screen.getByText('Save Changes')).toBeInTheDocument();
  });

  test('renders "No suggestions" when suggestions list is empty', () => {
    render(<EditEvaluationScreen />);
    expect(screen.getByText(/no suggestions/i)).toBeInTheDocument();
  });

  test('updates input values correctly using userEvent', async () => {
    const user = userEvent.setup();
    render(<EditEvaluationScreen />);

    const nameInput = screen.getByPlaceholderText('e.g., Midterm Exam');
    const dateInput = screen.getByLabelText('Select New Date') as HTMLInputElement;

    await user.clear(nameInput);
    await user.type(nameInput, 'Unit Test Exam');
    await user.clear(dateInput);
    await user.type(dateInput, '2025-10-20');

    expect(nameInput).toHaveValue('Unit Test Exam');
    expect(dateInput.value).toBe('2025-10-20');
  });

  test('alerts with correct message on save', async () => {
    const user = userEvent.setup();
    window.alert = jest.fn();

    render(<EditEvaluationScreen />);

    await user.type(screen.getByPlaceholderText('e.g., Midterm Exam'), 'Integration Test');
    await user.type(screen.getByLabelText('Select New Date'), '2025-10-25');
    await user.click(screen.getByText('Save Changes'));

    expect(window.alert).toHaveBeenCalledWith('Saved evaluation: Integration Test on 2025-10-25');
  });
});