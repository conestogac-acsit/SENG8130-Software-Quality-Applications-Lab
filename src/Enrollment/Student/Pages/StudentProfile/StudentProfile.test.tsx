import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import StudentProfile from './StudentProfile';

// ✅ Mock alert and confirm
beforeAll(() => {
  window.alert = jest.fn();
  window.confirm = jest.fn(() => true);
});

// ✅ Dummy student data
const mockStudent = {
  id: '1',
  name: 'Maharshi Purohit',
  email: 'maharshi@example.com',
  imageUrl: 'https://via.placeholder.com/100',
  notes: 'Consistent and helpful in the team.',
};

// ✅ Mocks
const mockFindStudentById = jest.fn(() => mockStudent);
const mockDeleteStudentById = jest.fn();

const renderWithRouter = (id: string) => {
  render(
    <MemoryRouter initialEntries={[`/student/${id}`]}>
      <Routes>
        <Route
          path="/student/:id"
          element={
            <StudentProfile
              findStudentById={mockFindStudentById}
              deleteStudentById={mockDeleteStudentById}
            />
          }
        />
        <Route path="/students" element={<div>Redirected after deletion</div>} />
      </Routes>
    </MemoryRouter>
  );
};

// ✅ Tests
describe('StudentProfile Component', () => {
  it('renders student name', () => {
    renderWithRouter('1');
    expect(screen.getByText('Maharshi Purohit')).toBeInTheDocument();
  });

  it('renders student email', () => {
    renderWithRouter('1');
    expect(
      screen.getByText((text) => text.includes('maharshi@example.com'))
    ).toBeInTheDocument();
  });

  it('renders student ID', () => {
    renderWithRouter('1');
    expect(screen.getByText((text) => text.includes('Student ID:'))).toBeInTheDocument();
  });

  it('renders student notes', () => {
    renderWithRouter('1');
    expect(screen.getByText('Consistent and helpful in the team.')).toBeInTheDocument();
  });

  it('renders delete button and confirms deletion', () => {
    renderWithRouter('1');
    const deleteBtn = screen.getByText('Delete Student');
    fireEvent.click(deleteBtn);
    expect(mockDeleteStudentById).toHaveBeenCalledWith('1');
  });

  it('renders send email button with correct link', () => {
    renderWithRouter('1');
    const emailLink = screen.getByText('Send Email') as HTMLAnchorElement;
    expect(emailLink).toBeInTheDocument();
    expect(emailLink.href).toContain('/email/1');
  });

  it('renders edit button with correct link', () => {
    renderWithRouter('1');
    const editLink = screen.getByText('Edit Profile') as HTMLAnchorElement;
    expect(editLink).toBeInTheDocument();
    expect(editLink.href).toContain('/edit/1');
  });

  it('shows invalid ID error if no ID is provided', () => {
    render(
      <MemoryRouter initialEntries={['/student']}>
        <Routes>
          <Route
            path="/student"
            element={
              <StudentProfile
                findStudentById={mockFindStudentById}
                deleteStudentById={mockDeleteStudentById}
              />
            }
          />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText(/Invalid student ID/i)).toBeInTheDocument();
  });

  it('shows not found message if student is missing', () => {
    const brokenFind = jest.fn(() => undefined);
    render(
      <MemoryRouter initialEntries={['/student/1']}>
        <Routes>
          <Route
            path="/student/:id"
            element={
              <StudentProfile
                findStudentById={brokenFind}
                deleteStudentById={mockDeleteStudentById}
              />
            }
          />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText(/Student not found/i)).toBeInTheDocument();
  });

  it('renders default image if imageUrl is missing', () => {
    const noImageStudent = { ...mockStudent, imageUrl: '' };
    const noImageFind = jest.fn(() => noImageStudent);

    render(
      <MemoryRouter initialEntries={['/student/1']}>
        <Routes>
          <Route
            path="/student/:id"
            element={
              <StudentProfile
                findStudentById={noImageFind}
                deleteStudentById={mockDeleteStudentById}
              />
            }
          />
        </Routes>
      </MemoryRouter>
    );

    const img = screen.getByAltText('student') as HTMLImageElement;
    expect(img.src).toContain('placeholder');
  });
});
