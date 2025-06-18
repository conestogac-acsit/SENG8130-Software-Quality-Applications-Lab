import React from 'react';
import { render, screen } from '@testing-library/react';
import UploadStudentCsv from './UploadStudentCsv';

describe('UploadStudentCsv', () => {
  it('renders file input and label correctly', () => {
    const mockUpload = jest.fn();
    render(<UploadStudentCsv onUpload={mockUpload} />);

    const input = screen.getByLabelText(/Upload Student CSV/i);
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'file');
    expect(input).toHaveAttribute('accept', '.csv');
  });
});