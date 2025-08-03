import React from 'react';
import { render, screen } from '@testing-library/react';
import EnrollStatusVisual from './EnrollStatusVisual';
describe('EnrollStatusVisual', () => {
  it('renders the export dashboard section', () => {
    render(<EnrollStatusVisual />);

    // Check if export heading appears
    const heading = screen.getByText(/Export Dashboard/i);
    expect(heading).toBeInTheDocument();

    // Check if the export button is visible
    const button = screen.getByRole('button', { name: /Export Entire Dashboard as PNG/i });
    expect(button).toBeInTheDocument();

    // Check for container with correct ID
    const container = document.getElementById('enrollment-dashboard');
    expect(container).toBeTruthy();
  });
});