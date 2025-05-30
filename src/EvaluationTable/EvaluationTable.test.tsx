import React from 'react';
import { render, screen } from '@testing-library/react';
import EvaluationTable from './EvaluationTable';


jest.mock('../src/utils/csvHandler', () => ({
  loadEvaluations: () => [
    { id: '1', courseCode: 'CS101', evaluationType: 'Midterm', dueDate: '2025-10-01' }
  ],
  updateEvaluations: jest.fn()
}));

describe('EvaluationTable', () => {
  it('displays evaluation entries', () => {
    render(<EvaluationTable onEdit={() => {}} refreshFlag={0} />);
    expect(screen.getByText('CS101')).toBeInTheDocument();
    expect(screen.getByText('Midterm')).toBeInTheDocument();
    expect(screen.getByText('2025-10-01')).toBeInTheDocument();
  });
});
