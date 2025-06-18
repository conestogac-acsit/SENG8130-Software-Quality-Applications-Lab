import { render, screen } from '@testing-library/react';
import UploadEvaluationCsv from './UploadEvaluationCsv';

describe('UploadEvaluationCsv Component', () => {
  it('should render the label for uploading', () => {
    render(<UploadEvaluationCsv onUpload={() => {}} />);
    const label = screen.getByText(/Upload Evaluation CSV/u);
    expect(label).toBeInTheDocument();
  });

  it('should render the file input element', () => {
    render(<UploadEvaluationCsv onUpload={() => {}} />);
    const fileInput = screen.getByLabelText(/Upload Evaluation CSV/i);
    expect(fileInput).toBeInTheDocument();
    expect(fileInput).toHaveAttribute('type', 'file');
    expect(fileInput).toHaveAttribute('accept', '.csv');
  });
});