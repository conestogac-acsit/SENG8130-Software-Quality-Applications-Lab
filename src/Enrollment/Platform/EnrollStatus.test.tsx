import React from 'react';
import { render, screen, waitFor, within } from '@testing-library/react';
import EnrollStatus from '../EnrollStatus';

describe('EnrollStatus Dashboard', () => {
  test('renders title correctly', async () => {
    render(<EnrollStatus />);
    expect(await screen.findByText(/Enrollment Status Overview/i)).toBeInTheDocument();
  });

  test('renders pie chart headings', async () => {
    render(<EnrollStatus />);
    expect(screen.getByText(/GitHub Enrollment/i)).toBeInTheDocument();
    expect(screen.getByText(/Loop Enrollment/i)).toBeInTheDocument();
  });

  test('displays table headers', async () => {
    render(<EnrollStatus />);
    const headers = await screen.findAllByRole('columnheader');
    expect(headers.map(h => h.textContent)).toEqual(
      expect.arrayContaining(['Platform', 'Enrolled', 'Unenrolled', 'Total'])
    );
  });
});
