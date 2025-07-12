import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import EnrollmentActionSection from './EnrollmentActionSection';

describe('EnrollmentActionSection', () => {
  it('renders heading and button', () => {
    render(<EnrollmentActionSection />);
    expect(screen.getByText('Enrollment Action')).toBeInTheDocument();
    expect(screen.getByText('Enroll in GitHub')).toBeInTheDocument();
  });

  it('displays message on button click', () => {
    render(<EnrollmentActionSection />);
    fireEvent.click(screen.getByText('Enroll in GitHub'));
    expect(screen.getByText('Enrollment triggered')).toBeInTheDocument();
  });
});
