import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import StudentList from './StudentList';
import { Email } from '../../studentData/email';

const testStudentGetter = () => [
  {
    id: '1',
    name: 'Alice Johnson',
    email: new Email('alice@example.com'),
    role: 'Student',
    section: 'B',
    group: 'G2',
    imageUrl: '',
    notes: '',
    isLoopEnrolled: false,
    isGithubEnrolled: false,
  },
];

describe('StudentList Component (UI Test - Column Names and Pagination)', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <StudentList studentGetter={testStudentGetter} />
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
  it('renders a student row with data', () => {
    expect(screen.getByText('Alice Johnson')).toBeInTheDocument();
    expect(screen.getByText('alice@example.com')).toBeInTheDocument();
    expect(screen.getByText('Student')).toBeInTheDocument();
    expect(screen.getByText('B')).toBeInTheDocument();
    expect(screen.getByText('G2')).toBeInTheDocument();
  });
  it('renders email button correctly', () => {
    const emailButton = screen.getByRole('button', { name: '✉️' });
    expect(emailButton).toBeInTheDocument();
  });
  it('shows pagination summary', () => {
    expect(screen.getByText(/Showing 1–1 of 1 students/)).toBeInTheDocument();
  });
});
describe('StudentList Component - Empty State & Edge Cases', () => {
  it('renders "No students found." when list is empty', () => {
    render(
      <MemoryRouter>
        <StudentList studentGetter={() => []} />
      </MemoryRouter>
    );

    const noStudentMessages = screen.getAllByText('No students found.');
    expect(noStudentMessages.length).toBeGreaterThanOrEqual(1);
  });
  it('shows correct pagination when empty', () => {
    render(
      <MemoryRouter>
        <StudentList studentGetter={() => []} />
      </MemoryRouter>
    );
    expect(screen.getByText(/Showing 1-0 of 0 students/)).toBeInTheDocument();
  });
});
