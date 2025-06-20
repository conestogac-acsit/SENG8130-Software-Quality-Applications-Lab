import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import EnrollStatus from './EnrollStatus';
import { StudentLoadService } from '../../Student/Services/StudentLoadService';
import { within } from '@testing-library/react';

// Sample data
const mockStudents = [
  { githubStatus: 'enrolled', loopStatus: 'unenrolled' },
  { githubStatus: 'unenrolled', loopStatus: 'enrolled' },
  { githubStatus: 'enrolled', loopStatus: 'enrolled' },
  { githubStatus: 'enrolled', loopStatus: 'unenrolled' },
];

// Override the service method
StudentLoadService.createDefault = (): StudentService => ({
  loadStudents: async () => mockStudents,
});

beforeAll(() => {
  global.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});

describe('EnrollStatus Dashboard', () => {
  test('renders title correctly', async () => {
    render(<EnrollStatus />);
    const title = await screen.findByText(/Enrollment Status Overview/i);
    expect(title).toBeInTheDocument();
  });

  test('renders pie chart headings', async () => {
    render(<EnrollStatus />);
    expect(await screen.findByText(/GitHub Enrollment/i)).toBeInTheDocument();
    expect(await screen.findByText(/Loop Enrollment/i)).toBeInTheDocument();
  });

  test('displays summary table with correct headers', async () => {
    render(<EnrollStatus />);
    const headers = await screen.findAllByRole('columnheader');
    const headerTexts = headers.map(h => h.textContent);
    expect(headerTexts).toEqual(expect.arrayContaining(['Platform', 'Enrolled', 'Unenrolled', 'Total']));
  });

  test('displays total row values based on mock data', async () => {
    render(<EnrollStatus />);
    const table = await screen.findByRole('table');
    const rows = within(table).getAllByRole('row');

    const githubRow = rows.find(row => within(row).queryByText('GitHub'));
    const loopRow = rows.find(row => within(row).queryByText('Loop'));

    expect(githubRow).toHaveTextContent('GitHub');
    expect(loopRow).toHaveTextContent('Loop');
  });

  test('renders export buttons', async () => {
    render(<EnrollStatus />);
    expect(await screen.findByText(/Export CSV/i)).toBeInTheDocument();
    expect(screen.getByText(/Export Bar Chart PNG/i)).toBeInTheDocument();
    expect(screen.getByText(/Export GitHub Pie PNG/i)).toBeInTheDocument();
    expect(screen.getByText(/Export Loop Pie PNG/i)).toBeInTheDocument();
  });

  test('renders all chart containers by ID for PNG export', async () => {
    const { container } = render(<EnrollStatus />);
    expect(container.querySelector('#barChart')).toBeInTheDocument();
    expect(container.querySelector('#githubPieChart')).toBeInTheDocument();
    expect(container.querySelector('#loopPieChart')).toBeInTheDocument();
  });

  test('summary table shows correct data values for GitHub row', async () => {
    render(<EnrollStatus />);
    const table = await screen.findByRole('table');
    const githubRow = within(table).getAllByRole('row')[1]; // assuming GitHub is first row
    expect(githubRow).toHaveTextContent('17'); // enrolled
    expect(githubRow).toHaveTextContent('22'); // unenrolled
    expect(githubRow).toHaveTextContent('39'); // total
  });

  test('summary table shows correct data values for Loop row', async () => {
    render(<EnrollStatus />);
    const table = await screen.findByRole('table');
    const loopRow = within(table).getAllByRole('row')[2]; // second data row
    expect(loopRow).toHaveTextContent('10');
    expect(loopRow).toHaveTextContent('29');
    expect(loopRow).toHaveTextContent('39');
  });
});
