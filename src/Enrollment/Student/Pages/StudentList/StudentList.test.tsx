import { render, screen, fireEvent } from '@testing-library/react';
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

  // ✅ NEW TEST CASES BELOW

  it('renders the bulk assignment dropdown', () => {
    expect(screen.getByTestId('bulk-select')).toBeInTheDocument();
  });

  it('renders the bulk assign button', () => {
    expect(screen.getByTestId('bulk-assign-button')).toBeInTheDocument();
  });

  it('renders manual assignment dropdowns for each student', () => {
    const manualDropdowns = screen.getAllByDisplayValue('Assign Section');
    expect(manualDropdowns.length).toBeGreaterThan(0);
  });

  it('renders the View Assignment Logs button', () => {
    expect(screen.getByText(/View Assignment Logs/i)).toBeInTheDocument();
  });

  it('toggles logs visibility on button click', () => {
    const toggleButton = screen.getByText(/View Assignment Logs/i);
    fireEvent.click(toggleButton);
    expect(screen.getByText(/Hide Logs/i)).toBeInTheDocument();
  });
});
