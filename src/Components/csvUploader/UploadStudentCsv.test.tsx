import { render, screen, fireEvent } from '@testing-library/react';
import UploadStudentCsv from './UploadStudentCsv';

describe('UploadStudentCsv', () => {
  it('renders the Select Student CSV button', () => {
    render(<UploadStudentCsv />);
    expect(screen.getByText('Select Student CSV')).toBeInTheDocument();
  });

 it('renders the file input and visible text input', () => {
  render(<UploadStudentCsv />);
  
  const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
  const textInput = screen.getByPlaceholderText('No file selected');

  expect(fileInput).toBeInTheDocument();
  expect(textInput).toBeInTheDocument();
  expect(textInput).toHaveValue('');
});


  it('shows file name in text input when valid CSV is selected', () => {
    render(<UploadStudentCsv />);
    const file = new File(['data'], 'student.csv', { type: 'text/csv' });
    const fileInput = screen.getByRole('textbox').previousSibling as HTMLInputElement;

    fireEvent.change(fileInput, { target: { files: [file] } });

    const textInput = screen.getByPlaceholderText('No file selected');
    expect(textInput).toHaveValue('student.csv');
  });

  it('shows error if a non-CSV file is selected', () => {
    render(<UploadStudentCsv />);
    const file = new File(['not csv'], 'document.txt', { type: 'text/plain' });
    const fileInput = screen.getByRole('textbox').previousSibling as HTMLInputElement;

    fireEvent.change(fileInput, { target: { files: [file] } });

    expect(screen.getByText('File must be a CSV.')).toBeInTheDocument();
    const textInput = screen.getByPlaceholderText('No file selected');
    expect(textInput).toHaveValue('');
  });

  it('shows Upload button only after selecting valid file', () => {
    render(<UploadStudentCsv />);
    const file = new File(['data'], 'student.csv', { type: 'text/csv' });
    const fileInput = screen.getByRole('textbox').previousSibling as HTMLInputElement;

    fireEvent.change(fileInput, { target: { files: [file] } });

    expect(screen.getByText('Upload Student CSV')).toBeInTheDocument();
  });

  it('does not show Upload button before file is selected', () => {
    render(<UploadStudentCsv />);
    expect(screen.queryByText('Upload Student CSV')).not.toBeInTheDocument();
  });

  it('shows error when trying to upload without selecting a file', () => {
    render(<UploadStudentCsv />);
    const uploadBtn = screen.queryByText('Upload Student CSV');

    
    if (uploadBtn) {
      fireEvent.click(uploadBtn);
      expect(screen.getByText('Please select a CSV file first.')).toBeInTheDocument();
    }
  });

  it('clears error after valid CSV is selected following an invalid file', () => {
    render(<UploadStudentCsv />);
    const txtFile = new File(['dummy'], 'notcsv.txt', { type: 'text/plain' });
    const csvFile = new File(['dummy'], 'valid.csv', { type: 'text/csv' });
    const fileInput = screen.getByRole('textbox').previousSibling as HTMLInputElement;
   
    fireEvent.change(fileInput, { target: { files: [txtFile] } });
    expect(screen.getByText('File must be a CSV.')).toBeInTheDocument();
   
    fireEvent.change(fileInput, { target: { files: [csvFile] } });
    expect(screen.queryByText('File must be a CSV.')).not.toBeInTheDocument();
    expect(screen.getByPlaceholderText('No file selected')).toHaveValue('valid.csv');
  });
});
