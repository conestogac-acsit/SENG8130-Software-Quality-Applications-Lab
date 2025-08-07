import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import EnrollmentActionSection from './EnrollmentActionSection';

describe('EnrollmentActionSection', () => {
  it('renders the heading and the button', () => {
    render(<EnrollmentActionSection />);
    const heading = screen.getByText('Enrollment Action');
    const button = screen.getByText('Enroll in GitHub');

    expect(heading).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it('displays a message when the button is clicked', () => {
    render(<EnrollmentActionSection />);
    const button = screen.getByText('Enroll in GitHub');

    fireEvent.click(button);

    const message = screen.getByText('Enrollment triggered');
    expect(message).toBeInTheDocument();
  });
});
