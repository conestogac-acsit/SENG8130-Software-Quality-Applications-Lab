import { render } from '@testing-library/react';
import StudentCsvUpload from './StudentCsvUpload';

test('renders upload input', () => {
  const mockUpload = jest.fn();
  const { getByLabelText } = render(<StudentCsvUpload onUpload={mockUpload} />);
  expect(getByLabelText(/Upload Student CSV/i)).toBeInTheDocument();
});