import React from 'react';
import { render, screen } from '@testing-library/react';
import CustomTextInput from './CustomTextInput';

describe('CustomTextInput Component', () => {
  it('renders the label correctly', () => {
    render(
      <CustomTextInput label="First Name" name="firstName" placeholder="Enter first name" />
    );

    const labelElement = screen.getByText('First Name');
    expect(labelElement).toBeInTheDocument();
  });

  it('renders the input with correct placeholder and type', () => {
    render(
      <CustomTextInput label="Email" name="email" placeholder="Enter email" type="email" />
    );

    const inputElement = screen.getByPlaceholderText('Enter email');
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute('type', 'email');
    expect(inputElement).toHaveAttribute('name', 'email');
  });

  it('associates label htmlFor with input id', () => {
    render(
      <CustomTextInput label="Username" name="username" placeholder="Enter username" />
    );

    const label = screen.getByText('Username') as HTMLLabelElement;
    const input = screen.getByPlaceholderText('Enter username') as HTMLInputElement;

    expect(label.htmlFor).toBe(input.id);
  });
});
