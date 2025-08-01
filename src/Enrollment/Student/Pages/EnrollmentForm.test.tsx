import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import EnrollmentForm from './EnrollmentForm';

describe('EnrollmentForm', () => {
  const mockOnEnroll = jest.fn();

  beforeEach(() => {
    render(<EnrollmentForm onEnroll={mockOnEnroll} />);
  });

  it('renders the form heading', () => {
    expect(screen.getByText(/Student Enrollment Form/i)).toBeInTheDocument();
  });

  it('renders input fields for student details', () => {
    expect(screen.getByPlaceholderText('First Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Last Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Student ID')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Course Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email ID')).toBeInTheDocument();
  });

  it('renders enrollment buttons', () => {
    expect(screen.getByText('Enroll in GitHub')).toBeInTheDocument();
    expect(screen.getByText('Enroll in Loop')).toBeInTheDocument();
    expect(screen.getByText('Enroll in both')).toBeInTheDocument();
    expect(screen.getByText('Submit')).toBeInTheDocument();
  });

  it('calls onEnroll with correct values when buttons are clicked', () => {
    fireEvent.click(screen.getByText('Enroll in GitHub'));
    expect(mockOnEnroll).toHaveBeenCalledWith('GitHub');

    fireEvent.click(screen.getByText('Enroll in Loop'));
    expect(mockOnEnroll).toHaveBeenCalledWith('Loop');

    fireEvent.click(screen.getByText('Enroll in both'));
    expect(mockOnEnroll).toHaveBeenCalledWith('Both');

    fireEvent.click(screen.getByText('Submit'));
    expect(mockOnEnroll).toHaveBeenCalledWith('Form Submitted');
  });
});