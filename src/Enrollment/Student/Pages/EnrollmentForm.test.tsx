import React from 'react';
import { render, screen } from '@testing-library/react';
import EnrollmentForm from './EnrollmentForm';

describe('EnrollmentForm Component', () => {
  it('renders the heading inside CenteredFormContainer', () => {
    render(<EnrollmentForm />);
    const heading = screen.getByText('Student Enrollment Form');
    expect(heading).toBeInTheDocument();
  });
});
