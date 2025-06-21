import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ExportButton from './ExportButton';

describe('ExportButton', () => {
  test('renders with label and calls onClick when clicked', async () => {
    const handleClick = jest.fn(); 
    render(<ExportButton onClick={handleClick} label="Download Chart" />);
    const button = screen.getByRole('button', { name: /Download Chart/i });
    expect(button).toBeInTheDocument();