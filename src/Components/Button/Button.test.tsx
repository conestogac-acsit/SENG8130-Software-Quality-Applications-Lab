// src/components/Button.test.tsx
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Button from './Button';

describe('Button', () => {
  it('renders with default label', () => {
    const { getByText } = render(<Button onClick={() => {}} />);
    expect(getByText('Enroll')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    const { getByText } = render(<Button onClick={handleClick} />);
    fireEvent.click(getByText('Enroll'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('calls onMount when component mounts', () => {
    const onMount = jest.fn();
    render(<Button onClick={() => {}} onMount={onMount} />);
    expect(onMount).toHaveBeenCalledTimes(1);
  });
});
