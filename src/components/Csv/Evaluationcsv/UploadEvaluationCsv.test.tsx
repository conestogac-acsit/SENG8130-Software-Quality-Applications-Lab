import { render, screen,} from '@testing-library/react';
import UploadEvaluationCsv from './UploadEvaluationCsv';

describe('UploadEvaluationCsv Component', () => {
  it('should render the "Select CSV File" button', () => {
    render(<UploadEvaluationCsv onUpload={() => {}} />);
    const selectButton = screen.getByText(/Select CSV File/u);
    expect(selectButton).toBeInTheDocument();
  });

  it('should render the hidden file input with correct attributes', () => {
    render(<UploadEvaluationCsv onUpload={() => {}} />);
    const fileInput = screen.getByRole('textbox').previousSibling; 

    const hiddenFileInput = document.querySelector('input[type="file"]');

    expect(hiddenFileInput).toBeInTheDocument();
    expect(hiddenFileInput).toHaveAttribute('type', 'file');
    expect(hiddenFileInput).toHaveAttribute('accept', '.csv');
  });
});
