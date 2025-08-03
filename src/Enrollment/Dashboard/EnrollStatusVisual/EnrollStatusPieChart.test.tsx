import { render, screen } from '@testing-library/react';
import PieChartCard from './EnrollmentPieChart';

describe('EnrollmentPieChart Component (UI Test - Static Text)', () => {
  beforeEach(() => {
    render(
      <PieChartCard
        title="Platform Enrollment Comparison"
        chartId="platform-enrollment"
        data={[
          { name: 'GitHub', value: 20 },
          { name: 'Loop', value: 15 },
          { name: 'Other', value: 5 },
        ]}
      />
    );
  });

  it('renders the chart title', () => {
    expect(screen.getByText('Platform Enrollment Comparison')).toBeInTheDocument();
  });

  it('renders GitHub data label', () => {
    expect(screen.getByText('GitHub: 20')).toBeInTheDocument();
  });

  it('renders Loop data label', () => {
    expect(screen.getByText('Loop: 15')).toBeInTheDocument();
  });

  it('renders Other data label', () => {
    expect(screen.getByText('Other: 5')).toBeInTheDocument();
  });

  it('renders an SVG element for the pie chart', () => {
    const svg = document.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });
});