// src/components/EnrollButton.test.tsx
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import EnrollButton from './EnrollButton';

describe('EnrollButton', () => {
  it('renders with default label', () => {
    const { getByText } = render(<EnrollButton onClick={() => {}} />);
    expect(getByText('Enroll')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    const { getByText } = render(<EnrollButton onClick={handleClick} />);
    fireEvent.click(getByText('Enroll'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('calls onMount when component mounts', () => {
    const onMount = jest.fn();
    render(<EnrollButton onClick={() => {}} onMount={onMount} />);
    expect(onMount).toHaveBeenCalledTimes(1);
  });
});
