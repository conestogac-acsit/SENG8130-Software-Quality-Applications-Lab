import React from 'react';
import { render } from '@testing-library/react';
import EnrollmentForm from './EnrollmentForm';

describe('EnrollmentForm Component', () => {
  it('renders all fields and buttons', () => {
    const { getByPlaceholderText, getByText } = render(<EnrollmentForm />);

    expect(getByPlaceholderText('First Name')).toBeInTheDocument();
    expect(getByPlaceholderText('Last Name')).toBeInTheDocument();
    expect(getByPlaceholderText('Student ID')).toBeInTheDocument();
    expect(getByPlaceholderText('Course Name')).toBeInTheDocument();
    expect(getByPlaceholderText('Email ID')).toBeInTheDocument();

    expect(getByText('Enroll in GitHub')).toBeInTheDocument();
    expect(getByText('Submit')).toBeInTheDocument();
  });
});
