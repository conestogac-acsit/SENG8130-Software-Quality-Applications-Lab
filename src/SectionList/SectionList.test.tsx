import React from 'react';
import { render, screen } from '@testing-library/react';
import SectionList from "./SectionList";

const mockSections = [
  {
    name: 'AI for Managers',
    details: 'TECH402 - Fall 2025 - Section A',
  },
  {
    name: 'Software Testing',
    details: 'SENG8130 - Spring 2025 - Section 2',
  },
];

describe('SectionList Component (TDD)', () => {
  it('renders all section names and details from props', () => {
    render(<SectionList sections={mockSections} />);
    expect(screen.getByText('AI for Managers')).toBeInTheDocument();
    expect(screen.getByText('TECH402 - Fall 2025 - Section A')).toBeInTheDocument();
    expect(screen.getByText('Software Testing')).toBeInTheDocument();
    expect(screen.getByText('SENG8130 - Spring 2025 - Section 2')).toBeInTheDocument();
  });

  it('includes Upload and Download Excel buttons', () => {
    render(<SectionList sections={mockSections} />);
    expect(screen.getByText('Upload')).toBeInTheDocument();
    expect(screen.getByText('Download Excel')).toBeInTheDocument();
  });

  it('renders Edit, Delete, Email, GitHub action buttons for each section', () => {
    render(<SectionList sections={mockSections} />);
    expect(screen.getAllByTitle('Edit').length).toBe(2);
    expect(screen.getAllByTitle('Delete').length).toBe(2);
    expect(screen.getAllByTitle('Send Email').length).toBe(2);
    expect(screen.getAllByTitle('Create GitHub Repo').length).toBe(2);
  });
});
