import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import CsvUploadDemo from './CsvUploadDemo';

describe('CsvUploadDemo', () => {
  it('renders the CSV Upload Demo heading', () => {
    render(<CsvUploadDemo />);
    expect(screen.getByText('CSV Upload Demo')).toBeInTheDocument();
  });

  it('renders the UploadStudentCsv component', () => {
    render(<CsvUploadDemo />);
    expect(screen.getByText('Select Student CSV')).toBeInTheDocument();
  });

  it('renders the StudentSummary component', () => {
    render(<CsvUploadDemo />);
    expect(screen.getByText('Student Summary')).toBeInTheDocument();
  });

  it('shows no students message initially', () => {
    render(<CsvUploadDemo />);
    expect(screen.getByText('No students uploaded yet.')).toBeInTheDocument();
  });

  it('displays parsed students in summary after successful upload', async () => {
    render(<CsvUploadDemo />);
    
    const csvContent = "studentId,name,email,section,group,role,imageUrl,notes,loopStatus,githubStatus\n123,John Doe,john@example.com,A,Group1,Student,,,enrolled,Active";
    const file = new File([csvContent], 'students.csv', { type: 'text/csv' });
    
    const selectButton = screen.getByText('Select Student CSV');
    fireEvent.click(selectButton);
    
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    fireEvent.change(fileInput, { target: { files: [file] } });
    
    const uploadButton = screen.getByText('Upload Student CSV');
    fireEvent.click(uploadButton);
    
    await waitFor(() => {
      expect(screen.getByText((content, element) =>
        element?.tagName.toLowerCase() === 'li' && content.includes('John Doe')
      )).toBeInTheDocument();
      expect(screen.getByText((content, element) =>
        element?.tagName.toLowerCase() === 'li' && content.includes('john@example.com')
      )).toBeInTheDocument();
    });
    
    expect(screen.queryByText('No students uploaded yet.')).not.toBeInTheDocument();
  });

  it('handles multiple students in CSV correctly', async () => {
    render(<CsvUploadDemo />);
    
    const csvContent = "studentId,name,email,section,group,role,imageUrl,notes,loopStatus,githubStatus\n123,John Doe,john@example.com,A,Group1,Student,,,enrolled,Active\n456,Jane Smith,jane@example.com,B,Group2,Student,,,enrolled,Active";
    const file = new File([csvContent], 'students.csv', { type: 'text/csv' });
    
    const selectButton = screen.getByText('Select Student CSV');
    fireEvent.click(selectButton);
    
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    fireEvent.change(fileInput, { target: { files: [file] } });
    
    const uploadButton = screen.getByText('Upload Student CSV');
    fireEvent.click(uploadButton);
    
    await waitFor(() => {
      expect(screen.getByText((content, element) =>
        element?.tagName.toLowerCase() === 'li' && content.includes('John Doe')
      )).toBeInTheDocument();
      expect(screen.getByText((content, element) =>
        element?.tagName.toLowerCase() === 'li' && content.includes('john@example.com')
      )).toBeInTheDocument();
      expect(screen.getByText((content, element) =>
        element?.tagName.toLowerCase() === 'li' && content.includes('Jane Smith')
      )).toBeInTheDocument();
      expect(screen.getByText((content, element) =>
        element?.tagName.toLowerCase() === 'li' && content.includes('jane@example.com')
      )).toBeInTheDocument();
    });
  });

  it('shows error message for invalid CSV format', async () => {
    render(<CsvUploadDemo />);
    
    const csvContent = "name,email\nJohn Doe,john@example.com";
    const file = new File([csvContent], 'invalid.csv', { type: 'text/csv' });
    
    const selectButton = screen.getByText('Select Student CSV');
    fireEvent.click(selectButton);
    
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    fireEvent.change(fileInput, { target: { files: [file] } });
    
    const uploadButton = screen.getByText('Upload Student CSV');
    fireEvent.click(uploadButton);
    
    await waitFor(() => {
      expect(screen.getByText(/CSV Parse Error/)).toBeInTheDocument();
    });
    
    expect(screen.getByText('No students uploaded yet.')).toBeInTheDocument();
  });

  it('maintains state between uploads', async () => {
    render(<CsvUploadDemo />);
    
    const csvContent1 = "studentId,name,email,section,group,role,imageUrl,notes,loopStatus,githubStatus\n123,John Doe,john@example.com,A,Group1,Student,,,enrolled,Active";
    const file1 = new File([csvContent1], 'students1.csv', { type: 'text/csv' });
    
    const selectButton = screen.getByText('Select Student CSV');
    fireEvent.click(selectButton);
    
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    fireEvent.change(fileInput, { target: { files: [file1] } });
    
    const uploadButton = screen.getByText('Upload Student CSV');
    fireEvent.click(uploadButton);
    
    await waitFor(() => {
      expect(screen.getByText((content, element) =>
        element?.tagName.toLowerCase() === 'li' && content.includes('John Doe')
      )).toBeInTheDocument();
    });
    
    const csvContent2 = "studentId,name,email,section,group,role,imageUrl,notes,loopStatus,githubStatus\n456,Jane Smith,jane@example.com,B,Group2,Student,,,enrolled,Active";
    const file2 = new File([csvContent2], 'students2.csv', { type: 'text/csv' });
    
    fireEvent.change(fileInput, { target: { files: [file2] } });
    fireEvent.click(uploadButton);
    
    await waitFor(() => {
      expect(screen.getByText((content, element) =>
        element?.tagName.toLowerCase() === 'li' && content.includes('Jane Smith')
      )).toBeInTheDocument();
      expect(screen.getByText((content, element) =>
        element?.tagName.toLowerCase() === 'li' && content.includes('jane@example.com')
      )).toBeInTheDocument();
      expect(screen.queryByText((content, element) =>
        element?.tagName.toLowerCase() === 'li' && content.includes('John Doe')
      )).not.toBeInTheDocument();
    });
  });
}); 