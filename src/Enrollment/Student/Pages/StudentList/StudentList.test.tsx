import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import StudentList from './StudentList';

describe('StudentList Component – UI + Charts + Export', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <StudentList />
      </MemoryRouter>
    );
  });

  // Table
  it('renders Name column', () => {
    expect(screen.getByText('Name')).toBeInTheDocument();
  });

  // Pagination
  it('renders Prev and Next buttons', () => {
    expect(screen.getByText('Prev')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();
  });

  // Pie Charts
  it('renders GitHub Enrollment pie chart title', () => {
    expect(screen.getByText(/GitHub Enrollment/i)).toBeInTheDocument();
  });

  it('renders Loop Enrollment pie chart title', () => {
    expect(screen.getByText(/Loop Enrollment/i)).toBeInTheDocument();
  });

  it('renders GitHub pie summary block', () => {
    expect(screen.getByTestId('githubPieChart-summary')).toBeInTheDocument();
  });

  it('renders Loop pie summary block', () => {
    expect(screen.getByTestId('loopPieChart-summary')).toBeInTheDocument();
  });


});