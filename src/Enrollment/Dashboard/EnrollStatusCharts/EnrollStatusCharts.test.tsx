import React from 'react';
import { render, screen } from '@testing-library/react';
import EnrollStatusCharts from './EnrollStatusCharts';

const pieDataGitHub = [
  { name: 'Enrolled', value: 12 },
  { name: 'Unenrolled', value: 3 },
];

const pieDataLoop = [
  { name: 'Enrolled', value: 14 },
  { name: 'Unenrolled', value: 2 },
];

const barData = [
  { platform: 'GitHub', Enrolled: 12, Unenrolled: 3, Total: 15 },
  { platform: 'Loop', Enrolled: 14, Unenrolled: 2, Total: 16 },
];

describe('EnrollStatusCharts', () => {
  test('renders both pie charts and bar chart titles', () => {
    render(
      <EnrollStatusCharts
        pieDataGitHub={pieDataGitHub}
        pieDataLoop={pieDataLoop}
        barData={barData}
      />
    );

    expect(screen.getByText(/GitHub Enrollment/i)).toBeInTheDocument();
    expect(screen.getByText(/Loop Enrollment/i)).toBeInTheDocument();
    expect(screen.getByText(/Platform Enrollment Comparison/i)).toBeInTheDocument();
  });

  test('renders safely with empty data arrays', () => {
    render(
      <EnrollStatusCharts pieDataGitHub={[]} pieDataLoop={[]} barData={[]} />
    );
    expect(screen.getByText(/GitHub Enrollment/i)).toBeInTheDocument();
    expect(screen.getByText(/Loop Enrollment/i)).toBeInTheDocument();
    expect(screen.getByText(/Platform Enrollment Comparison/i)).toBeInTheDocument();
  });
});
