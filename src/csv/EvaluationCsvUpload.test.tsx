import { render } from '@testing-library/react';
import EvaluationCsvUpload from './EvaluationCsvUpload';

test('renders upload input', () => {
  const mockUpload = jest.fn();
  const { getByLabelText } = render(<EvaluationCsvUpload onUpload={mockUpload} />);
  expect(getByLabelText(/Upload Evaluation CSV/i)).toBeInTheDocument();
});