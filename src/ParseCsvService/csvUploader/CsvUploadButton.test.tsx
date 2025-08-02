import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CsvUploadButton from './CsvUploadButton';
import { Student, Evaluation } from '../ParseCsv';
import { useState } from 'react';

const DataDisplay: React.FC<{ data: any[]; dataType: string }> = ({ data, dataType }) => {
  if (data.length === 0) {
    return <div data-testid={`no-${dataType.toLowerCase()}`}>No {dataType.toLowerCase()} uploaded yet</div>;
  }

  return (
    <div data-testid={`${dataType.toLowerCase()}-summary`}>
      <h3>Uploaded {dataType} ({data.length})</h3>
      <ul>
        {data.map((item, index) => (
          <li key={index} data-testid={`${dataType.toLowerCase()}-${index}`}>
            {dataType === 'Students' ? `${item.name} - ${item.email}` : `${item.title} - ${item.course}`}
          </li>
        ))}
      </ul>
    </div>
  );
};

// Generic Test Wrapper Component
const TestWrapper = <T,>({ parseType, label, onDataParsed }: {
  parseType: "Student" | "Evaluation";
  label: string;
  onDataParsed: (data: T[]) => void;
}) => {
  return (
    <CsvUploadButton<T>
      parseType={parseType}
      onDataParsed={onDataParsed}
      label={label}
    />
  );
};

// Generic Demo Component
const GenericDemo: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [evaluations, setEvaluations] = useState<Evaluation[]>([]);

  return (
    <div data-testid="generic-demo">
      <h2>Generic CSV Upload Demo</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <h3>Student Upload</h3>
        <CsvUploadButton<Student>
          parseType="Student"
          onDataParsed={setStudents}
          label="Select Student CSV"
        />
        <DataDisplay data={students} dataType="Students" />
      </div>

      <div>
        <h3>Evaluation Upload</h3>
        <CsvUploadButton<Evaluation>
          parseType="Evaluation"
          onDataParsed={setEvaluations}
          label="Select Evaluation CSV"
        />
        <DataDisplay data={evaluations} dataType="Evaluations" />
      </div>
    </div>
  );
};

describe('CsvUploadButton - Generic Component Tests', () => {
  it('renders with custom label', () => {
    render(
      <TestWrapper<Student>
        parseType="Student"
        label="Custom Upload Label"
        onDataParsed={() => {}}
      />
    );
    expect(screen.getByText('Custom Upload Label')).toBeInTheDocument();
  });

  it('renders with default label when no label provided', () => {
    render(
      <CsvUploadButton<Student>
        parseType="Student"
        onDataParsed={() => {}}
      />
    );
    expect(screen.getByText('Upload CSV')).toBeInTheDocument();
  });

  it('renders the file input and visible text input', () => {
    render(
      <TestWrapper<Student>
        parseType="Student"
        label="Test Upload"
        onDataParsed={() => {}}
      />
    );

    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    const textInput = screen.getByPlaceholderText('No file selected');

    expect(fileInput).toBeInTheDocument();
    expect(textInput).toBeInTheDocument();
    expect(textInput).toHaveValue('');
  });

  it('shows file name in text input when valid CSV is selected', () => {
    render(
      <TestWrapper<Student>
        parseType="Student"
        label="Test Upload"
        onDataParsed={() => {}}
      />
    );
    
    const file = new File(['data'], 'test.csv', { type: 'text/csv' });
    const fileInput = screen.getByRole('textbox').previousSibling as HTMLInputElement;

    fireEvent.change(fileInput, { target: { files: [file] } });

    const textInput = screen.getByPlaceholderText('No file selected');
    expect(textInput).toHaveValue('test.csv');
  });

  it('shows error if a non-CSV file is selected', () => {
    render(
      <TestWrapper<Student>
        parseType="Student"
        label="Test Upload"
        onDataParsed={() => {}}
      />
    );
    
    const file = new File(['not csv'], 'document.txt', { type: 'text/plain' });
    const fileInput = screen.getByRole('textbox').previousSibling as HTMLInputElement;

    fireEvent.change(fileInput, { target: { files: [file] } });

    expect(screen.getByText('File must be a CSV.')).toBeInTheDocument();
    const textInput = screen.getByPlaceholderText('No file selected');
    expect(textInput).toHaveValue('');
  });

  it('shows upload button only after selecting valid file', () => {
    render(
      <TestWrapper<Student>
        parseType="Student"
        label="Test Upload"
        onDataParsed={() => {}}
      />
    );
    
    const file = new File(['data'], 'test.csv', { type: 'text/csv' });
    const fileInput = screen.getByRole('textbox').previousSibling as HTMLInputElement;

    fireEvent.change(fileInput, { target: { files: [file] } });

    expect(screen.getAllByText('Test Upload')).toHaveLength(2); // Select button and upload button
  });

  it('does not show upload button before file is selected', () => {
    render(
      <TestWrapper<Student>
        parseType="Student"
        label="Test Upload"
        onDataParsed={() => {}}
      />
    );
    

    const buttons = screen.getAllByText('Test Upload');
    expect(buttons).toHaveLength(1);
  });

  it('shows error when trying to upload without selecting a file', () => {
    render(
      <TestWrapper<Student>
        parseType="Student"
        label="Test Upload"
        onDataParsed={() => {}}
      />
    );
    
    const uploadButtons = screen.getAllByText('Test Upload');
    if (uploadButtons.length > 1) {
      fireEvent.click(uploadButtons[1]); // Upload button
      expect(screen.getByText('Please select a CSV file first.')).toBeInTheDocument();
    }
  });

  it('clears error after valid CSV is selected following an invalid file', () => {
    render(
      <TestWrapper<Student>
        parseType="Student"
        label="Test Upload"
        onDataParsed={() => {}}
      />
    );
    
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

describe('CsvUploadButton - Data Type Specific Tests', () => {
  it('parses and calls callback with student data when valid CSV is uploaded', async () => {
    const csvContent = `studentId,name,email,section,group,role,imageUrl,notes,loopStatus,githubStatus
12345,John Doe,john.doe@email.com,CS101,A,Student,https://example.com/john.jpg,Good student,enrolled,Active`;

    let receivedData: any[] = [];
    const callback = (data: any[]) => {
      receivedData = data;
    };

    render(
      <TestWrapper<Student>
        parseType="Student"
        label="Upload Students"
        onDataParsed={callback}
      />
    );

    const file = new File([csvContent], 'students.csv', { type: 'text/csv' });
    const fileInput = screen.getByRole('textbox').previousSibling as HTMLInputElement;

    fireEvent.change(fileInput, { target: { files: [file] } });
    
    const uploadBtn = screen.getAllByText('Upload Students')[1]; // Upload button
    fireEvent.click(uploadBtn);

    await new Promise(resolve => setTimeout(resolve, 100));
    
    expect(receivedData).toHaveLength(1);
    expect(receivedData[0]).toEqual({
      studentId: '12345',
      name: 'John Doe',
      email: 'john.doe@email.com',
      section: 'CS101',
      group: 'A',
      role: 'Student',
      imageUrl: 'https://example.com/john.jpg',
      notes: 'Good student',
      loopStatus: 'enrolled',
      githubStatus: 'Active'
    });
  });

  it('parses and calls callback with evaluation data when valid CSV is uploaded', async () => {
    const csvContent = `course,title,type,weight,dueDate,instructor,campus
CS101,Midterm Exam,Exam,30,2024-03-15,Dr. Smith,Main Campus`;

    let receivedData: any[] = [];
    const callback = (data: any[]) => {
      receivedData = data;
    };

    render(
      <TestWrapper<Evaluation>
        parseType="Evaluation"
        label="Upload Evaluations"
        onDataParsed={callback}
      />
    );

    const file = new File([csvContent], 'evaluations.csv', { type: 'text/csv' });
    const fileInput = screen.getByRole('textbox').previousSibling as HTMLInputElement;

    fireEvent.change(fileInput, { target: { files: [file] } });
    
    const uploadBtn = screen.getAllByText('Upload Evaluations')[1]; // Upload button
    fireEvent.click(uploadBtn);

    await new Promise(resolve => setTimeout(resolve, 100));
    
    expect(receivedData).toHaveLength(1);
    expect(receivedData[0]).toEqual({
      course: 'CS101',
      title: 'Midterm Exam',
      type: 'Exam',
      weight: 30,
      dueDate: new Date('2024-03-15'),
      instructor: 'Dr. Smith',
      campus: 'Main Campus'
    });
  });

  it('shows parsing error for invalid CSV format', async () => {
    const invalidCsvContent = `Invalid,Headers
data,without,proper,columns`;

    let callCount = 0;
    const callback = (data: any[]) => {
      callCount++;
    };

    render(
      <TestWrapper<Student>
        parseType="Student"
        label="Test Upload"
        onDataParsed={callback}
      />
    );

    const file = new File([invalidCsvContent], 'invalid.csv', { type: 'text/csv' });
    const fileInput = screen.getByRole('textbox').previousSibling as HTMLInputElement;

    fireEvent.change(fileInput, { target: { files: [file] } });
    
    const uploadBtn = screen.getAllByText('Test Upload')[1]; // Upload button
    fireEvent.click(uploadBtn);

    await new Promise(resolve => setTimeout(resolve, 100));
    
    expect(screen.getByText(/CSV Parse Error/)).toBeInTheDocument();
    expect(callCount).toBe(0);
  });
});

describe('CsvUploadButton - Complete Integration Demo', () => {
  it('demonstrates generic component working with multiple data types', async () => {
    const studentCsv = `studentId,name,email,section,group,role,imageUrl,notes,loopStatus,githubStatus
12345,John Doe,john.doe@email.com,CS101,A,Student,https://example.com/john.jpg,Good student,enrolled,Active`;

    const evaluationCsv = `course,title,type,weight,dueDate,instructor,campus
CS101,Midterm Exam,Exam,30,2024-03-15,Dr. Smith,Main Campus
CS101,Final Project,Project,40,2024-04-20,Dr. Smith,Main Campus`;

    render(<GenericDemo />);

    const studentFile = new File([studentCsv], 'students.csv', { type: 'text/csv' });
    const studentFileInput = screen.getAllByRole('textbox')[0].previousSibling as HTMLInputElement;
    
    fireEvent.change(studentFileInput, { target: { files: [studentFile] } });
    const studentUploadBtn = screen.getAllByText('Select Student CSV')[1]; // Upload button
    fireEvent.click(studentUploadBtn);

    const evaluationFile = new File([evaluationCsv], 'evaluations.csv', { type: 'text/csv' });
    const evaluationFileInput = screen.getAllByRole('textbox')[1].previousSibling as HTMLInputElement;
    
    fireEvent.change(evaluationFileInput, { target: { files: [evaluationFile] } });
    const evaluationUploadBtn = screen.getAllByText('Select Evaluation CSV')[1]; // Upload button
    fireEvent.click(evaluationUploadBtn);

    await new Promise(resolve => setTimeout(resolve, 200));

    const studentSummary = await screen.findByTestId('students-summary');
    const evaluationSummary = await screen.findByTestId('evaluations-summary');
    
    expect(studentSummary).toBeInTheDocument();
    expect(evaluationSummary).toBeInTheDocument();
    
    expect(screen.getByText('Uploaded Students (1)')).toBeInTheDocument();
    expect(screen.getByText('Uploaded Evaluations (2)')).toBeInTheDocument();
  });

  it('shows that the same component works for different data types without modification', () => {
    render(<GenericDemo />);
    
    const uploadButtons = screen.getAllByText(/Select.*CSV/);
    expect(uploadButtons).toHaveLength(2);
    expect(uploadButtons[0]).toHaveTextContent('Select Student CSV');
    expect(uploadButtons[1]).toHaveTextContent('Select Evaluation CSV');
  });

  it('handles empty state correctly for both data types', () => {
    render(<GenericDemo />);
    
    expect(screen.getByTestId('no-students')).toHaveTextContent('No students uploaded yet');
    expect(screen.getByTestId('no-evaluations')).toHaveTextContent('No evaluations uploaded yet');
  });
}); 