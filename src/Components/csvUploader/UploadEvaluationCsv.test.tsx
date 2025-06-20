
import { render, screen, fireEvent } from '@testing-library/react';
import UploadEvaluationCsv from './UploadEvaluationCsv';

describe('UploadEvaluationCsv Component', () => {
  it('should render the label for uploading', () => {
    render(<UploadEvaluationCsv />);
    const button = screen.getByRole('button', { name: /Select CSV File/i });
    expect(button).toBeInTheDocument();
  });

  it('should render the file input element', () => {
    render(<UploadEvaluationCsv />); 
    const hiddenFileInput = document.querySelector('input[type="file"]');
    expect(hiddenFileInput).toBeInTheDocument();
    expect(hiddenFileInput).toHaveAttribute('type', 'file');
    expect(hiddenFileInput).toHaveAttribute('accept', '.csv');
  });

  it('should render the placeholder text in the text input', () => {
    render(<UploadEvaluationCsv />);
    const textInput = screen.getByPlaceholderText('No file selected');
    expect(textInput).toBeInTheDocument();
    expect(textInput).toHaveAttribute('readOnly');
    expect(textInput).toHaveValue('');
  });

  it('should display the selected file name in the text input', () => {
    render(<UploadEvaluationCsv />);
    const file = new File(['test'], 'testfile.csv', { type: 'text/csv' });
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    fireEvent.change(fileInput, { target: { files: [file] } });
    const textInput = screen.getByPlaceholderText('No file selected');
    expect(textInput).toHaveValue('testfile.csv');
  });

  it('should show error if non-csv file is selected', () => {
    render(<UploadEvaluationCsv />);
    const file = new File(['test'], 'testfile.txt', { type: 'text/plain' });
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    fireEvent.change(fileInput, { target: { files: [file] } });
    expect(screen.getByText('File must be a CSV.')).toBeInTheDocument();
  });

  it('should display an error message when selecting a non-CSV file', () => {
  render(<UploadEvaluationCsv />);
  const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
  const invalidFile = new File(['dummy'], 'testfile.docx', { type: 'application/msword' });

  fireEvent.change(fileInput, { target: { files: [invalidFile] } });

  const errorMessage = screen.getByText('File must be a CSV.');
  expect(errorMessage).toBeInTheDocument();
});


  it('should show upload button after selecting a valid csv file', () => {
    render(<UploadEvaluationCsv />);
    const file = new File(['test'], 'testfile.csv', { type: 'text/csv' });
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    fireEvent.change(fileInput, { target: { files: [file] } });
    expect(screen.getByText('Upload')).toBeInTheDocument();
  });

  it('should clear error message after selecting a valid csv file following an error', () => {
    render(<UploadEvaluationCsv />);
    const txtFile = new File(['test'], 'testfile.txt', { type: 'text/plain' });
    const csvFile = new File(['test'], 'testfile.csv', { type: 'text/csv' });
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    fireEvent.change(fileInput, { target: { files: [txtFile] } });
    expect(screen.getByText('File must be a CSV.')).toBeInTheDocument();
    fireEvent.change(fileInput, { target: { files: [csvFile] } });
    expect(screen.queryByText('File must be a CSV.')).not.toBeInTheDocument();
  });
});
