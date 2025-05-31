// src/components/EnrollmentDashboard.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import EnrollmentDashboard from './EnrollmentDashboard';
import '@testing-library/jest-dom';

// Mock global ResizeObserver to avoid crash during ResponsiveContainer render
global.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
};

interface Student {
  Email: string;
  'First Name': string;
  'Last Name': string;
  'Student ID': string;
  Role: string;
  Status: string;
}

const mockGithub: Student[] = [
  {
    Email: 'a@example.com',
    'First Name': 'Alice',
    'Last Name': 'Smith',
    'Student ID': '1',
    Role: 'student',
    Status: 'enrolled',
  },
  {
    Email: 'b@example.com',
    'First Name': 'Bob',
    'Last Name': 'Brown',
    'Student ID': '2',
    Role: 'student',
    Status: 'unenrolled',
  },
];

const mockLoop: Student[] = [
  {
    Email: 'c@example.com',
    'First Name': 'Charlie',
    'Last Name': 'Davis',
    'Student ID': '3',
    Role: 'student',
    Status: 'need removal',
  },
];

describe('EnrollmentDashboard', () => {
  it('renders action buttons correctly', () => {
    render(<EnrollmentDashboard github={mockGithub} loop={mockLoop} onBack={() => {}} />);
    expect(screen.getByText('Download as PNG')).toBeInTheDocument();
    expect(screen.getByText('← Back to Main')).toBeInTheDocument();
  });

  it('calls onBack when back button is clicked', () => {
    const onBackMock = jest.fn();
    render(<EnrollmentDashboard github={mockGithub} loop={mockLoop} onBack={onBackMock} />);
    fireEvent.click(screen.getByText('← Back to Main'));
    expect(onBackMock).toHaveBeenCalledTimes(1);
  });

  it('renders chart section headers', () => {
    render(<EnrollmentDashboard github={mockGithub} loop={mockLoop} onBack={() => {}} />);
    expect(screen.getByText(/Enrollment Status Comparison/i)).toBeInTheDocument();
    expect(screen.getByText(/Enrollment Trends/i)).toBeInTheDocument();
    expect(screen.getByText(/Status Distribution/i)).toBeInTheDocument();
  });
});
