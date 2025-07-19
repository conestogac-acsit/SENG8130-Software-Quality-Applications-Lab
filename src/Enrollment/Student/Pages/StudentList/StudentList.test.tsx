import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import StudentList from './StudentList';

describe('StudentList Component (UI Structure & Charts)', () => {
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

  it('renders the "Group" column', () => {
    expect(screen.getByText('Group')).toBeInTheDocument();
  });

  it('renders the "Actions" column', () => {
    expect(screen.getByText('Actions')).toBeInTheDocument();
  });

  it('renders the "Prev" button', () => {
    expect(screen.getByText('Prev')).toBeInTheDocument();
  });

  it('renders the "Next" button', () => {
    expect(screen.getByText('Next')).toBeInTheDocument();
  });

  it('renders EnrollStatusView charts section', () => {
    expect(screen.getByText(/GitHub Enrollment/i)).toBeInTheDocument();
    expect(screen.getByText(/Loop Enrollment/i)).toBeInTheDocument();
    expect(screen.getByText(/Platform Enrollment Comparison/i)).toBeInTheDocument();
  });
  
});
