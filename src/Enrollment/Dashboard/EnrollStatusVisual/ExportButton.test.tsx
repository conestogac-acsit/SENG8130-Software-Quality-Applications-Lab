import { render, screen, fireEvent } from '@testing-library/react';
import ExportButton from './ExportButton';

describe('ExportButton Component (UI Tests)', () => {
  it('renders with default label "Export as PNG"', () => {
    render(<ExportButton onClick={() => {}} />);
    expect(screen.getByText('Export as PNG')).toBeInTheDocument();
  });

  it('renders with custom label when provided', () => {
    render(<ExportButton onClick={() => {}} label="Download Dashboard" />);
    expect(screen.getByText('Download Dashboard')).toBeInTheDocument();
  });

  it('responds to click events without mocking', () => {
    const handleClick = jest.fn();
    render(<ExportButton onClick={handleClick} label="Export Now" />);
    const button = screen.getByText('Export Now');
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalled();
  });

  it('sets data-testid and aria-label properly', () => {
    render(
      <ExportButton
        onClick={() => {}}
        label="Custom Export"
        testId="custom-test-id"
        ariaLabel="Custom Export Label"
      />
    );

    const button = screen.getByTestId('custom-test-id');
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('aria-label', 'Custom Export Label');
  });
});
