import { render, screen } from '@testing-library/react';
import EnrollStatusExports from './EnrollStatusExports';

describe('EnrollStatusExports Component (UI Test - Button and Title)', () => {
  beforeEach(() => {
    render(<EnrollStatusExports />);
  });

  it('renders the export section heading', () => {
    expect(screen.getByText('Export Dashboard')).toBeInTheDocument();
  });

  it('renders the export button with correct label', () => {
    expect(screen.getByText('Export Entire Dashboard as PNG')).toBeInTheDocument();
  });
});
