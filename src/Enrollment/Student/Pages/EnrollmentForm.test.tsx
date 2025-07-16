import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import EnrollmentForm from './EnrollmentForm';

describe('EnrollmentForm Component', () => {
  it('renders the heading inside CenteredFormContainer', () => {
    render(<EnrollmentForm />);
    const heading = screen.getByText('Student Enrollment Form');
    expect(heading).toBeInTheDocument();
  });

  it('renders all input fields and checkboxes', () => {
    render(<EnrollmentForm />);

    expect(screen.getByPlaceholderText('First Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Last Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Student ID')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Course Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email ID')).toBeInTheDocument();

    expect(screen.getByLabelText('GITHUB')).toBeInTheDocument();
    expect(screen.getByLabelText('LOOP')).toBeInTheDocument();
  });

  it('renders all enrollment buttons', () => {
    render(<EnrollmentForm />);

    expect(screen.getByText('Enroll in GitHub')).toBeInTheDocument();
    expect(screen.getByText('Enroll in Loop')).toBeInTheDocument();
    expect(screen.getByText('Enroll in both')).toBeInTheDocument();
    expect(screen.getByText('Submit')).toBeInTheDocument();
  });

  it('does not break when enrollment buttons are clicked', () => {
    render(<EnrollmentForm />);

    fireEvent.click(screen.getByText('Enroll in GitHub'));
    fireEvent.click(screen.getByText('Enroll in Loop'));
    fireEvent.click(screen.getByText('Enroll in both'));
    fireEvent.click(screen.getByText('Submit'));

    // Still shows form heading after clicks
    expect(screen.getByText('Student Enrollment Form')).toBeInTheDocument();
  });
});