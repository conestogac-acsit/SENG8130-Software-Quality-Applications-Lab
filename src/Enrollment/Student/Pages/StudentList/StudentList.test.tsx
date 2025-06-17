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
  it('renders the "Email" column', () => {
    expect(screen.getByText('Email')).toBeInTheDocument();
  });
    it('renders the "Role" column', () => {
    expect(screen.getByText('Role')).toBeInTheDocument();
  });
    it('renders the "Section" column', () => {
    expect(screen.getByText('Section')).toBeInTheDocument();
  });
});
