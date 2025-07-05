import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ExportButton from './ExportButton';

describe('ExportButton', () => {
  test('renders with custom label and triggers onClick', async () => {
    const handleClick = jest.fn();

    render(
      <ExportButton
        onClick={handleClick}
        label="Download Chart"
        ariaLabel="Download Chart"
      />
    );

    const button = screen.getByRole('button', { name: /Download Chart/i });
    expect(button).toBeInTheDocument();

    await userEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('renders with default label and default aria-label', () => {
    const handleClick = jest.fn();
    render(<ExportButton onClick={handleClick} />);
    const button = screen.getByRole('button', { name: /Export as PNG/i });
    expect(button).toBeInTheDocument();
  });

  test('renders SVG icon inside the button', () => {
    const handleClick = jest.fn();
    render(<ExportButton onClick={handleClick} />);
    const svg = screen.getByTestId('export-icon');
    expect(svg.tagName.toLowerCase()).toBe('svg');
  });

  test('applies correct CSS classes for styling', () => {
    const handleClick = jest.fn();
    render(<ExportButton onClick={handleClick} />);
    const button = screen.getByTestId('export-button');
    expect(button).toHaveClass(
      'bg-blue-500',
      'hover:bg-blue-600',
      'text-white',
      'px-8',
      'py-4',
      'rounded-lg',
      'shadow-md',
      'transition-colors',
      'duration-200',
      'flex',
      'items-center',
      'gap-3'
    );
  });
});
