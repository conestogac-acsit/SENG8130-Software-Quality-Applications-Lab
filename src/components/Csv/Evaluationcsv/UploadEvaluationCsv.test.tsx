import { render, screen } from '@testing-library/react';
import UploadEvaluationCsv from './UploadEvaluationCsv';

describe('UploadEvaluationCsv Component', () => {
  it('should render the label for uploading', () => {
    render(<UploadEvaluationCsv />);
    const label = screen.getByText(/Select CSV File/u); 
    expect(label).toBeInTheDocument();
  });

  it('should render the file input element', () => {
    render(<UploadEvaluationCsv />); 
    const hiddenFileInput = document.querySelector('input[type="file"]');
    expect(hiddenFileInput).toBeInTheDocument();
    expect(hiddenFileInput).toHaveAttribute('type', 'file');
    expect(hiddenFileInput).toHaveAttribute('accept', '.csv');
  });
});
