import React from 'react';
import { render, screen } from '@testing-library/react';
import FirstNameInput from './FirstNameInput';

describe('FirstNameInput Component', () => {
  it('renders the label correctly', () => {
    render(<FirstNameInput label="First Name" name="firstName" placeholder="Enter first name" />);

    const labelElement = screen.getByText('First Name');
    expect(labelElement).toBeInTheDocument();
  });

  it('renders the input with correct placeholder and type', () => {
    render(<FirstNameInput label="Email" name="email" placeholder="Enter email" type="email" />);
    const inputElement = screen.getByPlaceholderText('Enter email');

    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute('type', 'email');
    expect(inputElement).toHaveAttribute('name', 'email');
  });

  it('associates label htmlFor with input id', () => {
    render(<FirstNameInput label="Username" name="username" placeholder="Enter username" />);
    const label = screen.getByText('Username') as HTMLLabelElement;
    const input = screen.getByPlaceholderText('Enter username') as HTMLInputElement;

    expect(label.htmlFor).toBe(input.id);
  });
});
