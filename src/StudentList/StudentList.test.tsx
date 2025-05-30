import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import StudentList from "./StudentList";

const mockStudents = [
  {
    id: 1,
    name: 'Alice Johnson',
    email: 'alice.johnson@example.com',
    role: 'Student',
    section: 'A',
    group: 'G1',
  },
  {
    id: 2,
    name: 'Bob Smith',
    email: 'bob.smith@example.com',
    role: 'Student',
    section: 'B',
    group: 'G2',
  },
];

describe('StudentList Component (UI Test)', () => {
  it('renders a table of students with name, email, role, section, and group', () => {
    render(
      <MemoryRouter>
        <StudentList students={mockStudents} />
      </MemoryRouter>
    );
    expect(screen.getByText('Alice Johnson')).toBeInTheDocument();
    expect(screen.getByText('alice.johnson@example.com')).toBeInTheDocument();
    expect(screen.getAllByText('Student').length).toBe(2);
    expect(screen.getByText('A')).toBeInTheDocument();
    expect(screen.getByText('G1')).toBeInTheDocument();

    expect(screen.getByText('Bob Smith')).toBeInTheDocument();
    expect(screen.getByText('bob.smith@example.com')).toBeInTheDocument();
    expect(screen.getByText('B')).toBeInTheDocument();
    expect(screen.getByText('G2')).toBeInTheDocument();
  });

  it('renders Edit, Delete, and Send Email buttons for each student', () => {
    render(
      <MemoryRouter>
        <StudentList students={mockStudents} />
      </MemoryRouter>
    );
    expect(screen.getAllByTitle('Edit').length).toBe(2);
    expect(screen.getAllByTitle('Delete').length).toBe(2);
    expect(screen.getAllByTitle('Send Email').length).toBe(2);
  });

  it('shows "Showing 1-2 of 2 students" summary', () => {
    render(
      <MemoryRouter>
        <StudentList students={mockStudents} />
      </MemoryRouter>
    );
    expect(screen.getByText('Showing 1-2 of 2 students')).toBeInTheDocument();
  });
});
