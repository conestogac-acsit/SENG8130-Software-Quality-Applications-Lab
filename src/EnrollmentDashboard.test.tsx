import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import EnrollmentDashboard from './EnrollmentDashboard';
import '@testing-library/jest-dom';
global.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
};

jest.mock('html-to-image', () => ({
  toPng: jest.fn(() => Promise.resolve('data:image/png;base64,mocked')),
}));
jest.mock('file-saver', () => ({
  saveAs: jest.fn(),
}));

const mockGithub = [
  { Email: 'a@example.com', 'First Name': 'A', 'Last Name': 'B', 'Student ID': '1', Role: 'student', Status: 'enrolled' },
  { Email: 'b@example.com', 'First Name': 'B', 'Last Name': 'C', 'Student ID': '2', Role: 'student', Status: 'unenrolled' },
];

const mockLoop = [
  { Email: 'c@example.com', 'First Name': 'C', 'Last Name': 'D', 'Student ID': '3', Role: 'student', Status: 'need removal' },
];

describe('EnrollmentDashboard', () => {
  it('renders both action buttons', () => {
    render(<EnrollmentDashboard github={mockGithub} loop={mockLoop} onBack={jest.fn()} />);
    expect(screen.getByText('Download as PNG')).toBeInTheDocument();
    expect(screen.getByText(/← Back to Main/i)).toBeInTheDocument();
  });

  it('calls onBack when "Back to Main" button is clicked', () => {
    const onBackMock = jest.fn();
    render(<EnrollmentDashboard github={mockGithub} loop={mockLoop} onBack={onBackMock} />);
    fireEvent.click(screen.getByText(/← Back to Main/i));
    expect(onBackMock).toHaveBeenCalledTimes(1);
  });

  it('renders chart section headers', () => {
    render(<EnrollmentDashboard github={mockGithub} loop={mockLoop} onBack={jest.fn()} />);
    expect(screen.getByText(/Enrollment Status Comparison/i)).toBeInTheDocument();
    expect(screen.getByText(/Enrollment Trends/i)).toBeInTheDocument();
    expect(screen.getByText(/Status Distribution/i)).toBeInTheDocument();
  });
});
