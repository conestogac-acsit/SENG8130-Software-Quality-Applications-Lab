import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import EvaluationPage from './EvaluationPage';
import { EvaluationService } from '../EvaluationService';
import { LocalStorage } from '../../localStorageService/LocalStorage';

describe('EvaluationPage', () => {
  const service = new EvaluationService(new LocalStorage());

  beforeEach(() => {
    localStorage.clear();
    service.saveEvaluations([
      {
        evaluationId: '1',
        course: 'Math',
        title: 'Exam 1',
        type: 'Exam',
        weight: 30,
        dueDate: new Date().toISOString(),
        instructor: 'Prof. A',
        campus: 'Main'
      },
      {
        evaluationId: '2',
        course: 'Physics',
        title: 'Lab Report',
        type: 'Assignment',
        weight: 20,
        dueDate: new Date().toISOString(),
        instructor: 'Prof. B',
        campus: 'Main'
      }
    ]);
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('renders evaluations from storage', async () => {
    render(<EvaluationPage />);

    expect(await screen.findByText(/Evaluation Calendar/i)).toBeInTheDocument();
    expect(await screen.findByText(/Exam 1/i)).toBeInTheDocument();
    expect(await screen.findByText(/Lab Report/i)).toBeInTheDocument();
  });

  it('removes evaluation when Delete button clicked', async () => {
    render(<EvaluationPage />);

    const deleteButtons = await screen.findAllByRole('button', { name: /Delete/i });
    expect(deleteButtons.length).toBe(2);

    fireEvent.click(deleteButtons[0]);

    await waitFor(() => {
      expect(screen.queryByText(/Exam 1/i)).not.toBeInTheDocument();
    });

    expect(screen.getByText(/Lab Report/i)).toBeInTheDocument();
  });
});
