import React from 'react';
import { render, screen } from '@testing-library/react';
import PieChartCard, { ChartData } from './EnrollmentPieChart';

const testData: ChartData[] = [
  { name: 'Enrolled', value: 10 },
  { name: 'Unenrolled', value: 5 },
  { name: 'Pending', value: 3 },
];

describe('PieChartCard', () => {
  test('renders chart title correctly', () => {
    render(<PieChartCard title="Enrollment Status" data={testData} chartId="pie1" />);
    expect(screen.getByText(/Enrollment Status/i)).toBeInTheDocument();
  });

    test('renders chart with empty data safely', () => {
    const { container } = render(
      <PieChartCard title="Empty Chart" data={[]} chartId="pie3" />
    );
    const svg = container.querySelector('svg');
    expect(svg).not.toBeNull(); // It renders an empty chart container without crashing
  });
  
});
