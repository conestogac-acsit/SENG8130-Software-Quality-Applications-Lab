import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FirstnameInput from './FirstNameInput';

describe('FirstnameInput', () => {
  it('renders the input field with label', () => {
    render(<FirstnameInput />);
    expect(screen.getByLabelText('First Name')).toBeInTheDocument();
  });

  it('allows typing in the input field', () => {
    render(<FirstnameInput />);
    const input = screen.getByLabelText('First Name') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'Parminder' } });
    expect(input.value).toBe('Parminder');
  });

  it('logs to console on mount', () => {
    const logSpy = jest.spyOn(console, 'log').mockImplementation();
    render(<FirstnameInput />);
    expect(logSpy).toHaveBeenCalledWith('FirstnameInput mounted');
    logSpy.mockRestore();
  });
});