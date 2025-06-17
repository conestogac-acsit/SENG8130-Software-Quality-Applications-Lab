import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import StudentList from './StudentList';

describe('StudentList Component (UI Test - Column Names and Pagination)', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <StudentList />
      </MemoryRouter>
    );
  });
  it('renders the "Name" column', () => {
    expect(screen.getByText('Name')).toBeInTheDocument();
  });
});
