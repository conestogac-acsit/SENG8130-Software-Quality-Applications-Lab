import { render, screen } from '@testing-library/react';
import EnrollStatusVisual from './EnrollStatusVisual';

describe('EnrollStatusVisual Component (UI Test - Empty Data)', () => {
  beforeEach(() => {
    render(<EnrollStatusVisual />);
  });

  it('renders GitHub and Loop chart headers', () => {
    expect(screen.getByText('GitHub Enrollment')).toBeInTheDocument();
    expect(screen.getByText('Loop Enrollment')).toBeInTheDocument();
  });

  it('renders bar chart title', () => {
    expect(screen.getByText('Platform Enrollment Comparison')).toBeInTheDocument();
  });

  it('renders fallback message for empty bar chart', () => {
    expect(screen.getByText('No data available for bar chart')).toBeInTheDocument();
  });

  });
