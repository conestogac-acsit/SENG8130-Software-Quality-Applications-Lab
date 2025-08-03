import { render, screen } from '@testing-library/react';
import EnrollStatusCharts from './EnrollStatusCharts';

describe('EnrollStatusCharts Component (UI Test - Title and Summary)', () => {
  beforeEach(() => {
    render(
      <EnrollStatusCharts
        pieDataGitHub={[
          { name: 'Enrolled', value: 10 },
          { name: 'Not Enrolled', value: 5 }
        ]}
        pieDataLoop={[
          { name: 'Registered', value: 8 },
          { name: 'Dropped', value: 3 }
        ]}
        barData={[
          { platform: 'GitHub', Enrolled: 10, Unenrolled: 5, Total: 15 },
          { platform: 'Loop', Enrolled: 8, Unenrolled: 3, Total: 11 }
        ]}
      />
    );
  });

  it('renders GitHub pie chart title and summary', () => {
    expect(screen.getByText('GitHub Enrollment')).toBeInTheDocument();
    expect(screen.getByText('Enrolled: 10')).toBeInTheDocument();
    expect(screen.getByText('Not Enrolled: 5')).toBeInTheDocument();
  });

  it('renders Loop pie chart title and summary', () => {
    expect(screen.getByText('Loop Enrollment')).toBeInTheDocument();
    expect(screen.getByText('Registered: 8')).toBeInTheDocument();
    expect(screen.getByText('Dropped: 3')).toBeInTheDocument();
  });

  it('renders bar chart title and platform labels', () => {
    expect(screen.getByText('Platform Enrollment Comparison')).toBeInTheDocument();
    expect(screen.getByText('GitHub')).toBeInTheDocument();
    expect(screen.getByText('Loop')).toBeInTheDocument();
  });

  it('renders an SVG element for each chart type', () => {
    const svgElements = document.querySelectorAll('svg');
    expect(svgElements.length).toBeGreaterThanOrEqual(3); // 2 pies + 1 bar
  });
});
