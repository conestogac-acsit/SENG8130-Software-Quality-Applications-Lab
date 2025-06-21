import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import EnrollStatusExports from './EnrollStatusExports';

describe('EnrollStatusExports', () => {
  test('renders export dashboard section with button', async () => {
    render(<EnrollStatusExports />);
    expect(screen.getByText(/Export Dashboard/i)).toBeInTheDocument();
     const button = screen.getByRole('button', { name: /Export Entire Dashboard as PNG/i });
    expect(button).toBeInTheDocument();
    await userEvent.click(button); 
  });
});
