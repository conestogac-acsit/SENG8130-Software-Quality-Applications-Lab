
import React from 'react';
import { render, screen } from '@testing-library/react';
import ConfirmationMessage from './ConfirmationMessage';

describe('ConfirmationMessage', () => {
  it('renders nothing when message is empty', () => {
    const { container } = render(<ConfirmationMessage message="" type="success" />);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders success message with green text', () => {
    render(<ConfirmationMessage message="Saved successfully!" type="success" />);
    const messageElement = screen.getByText('Saved successfully!');
    expect(messageElement).toBeInTheDocument();
    expect(messageElement).toHaveClass('text-green-600');
  });

  it('renders error message with red text', () => {
    render(<ConfirmationMessage message="Something went wrong!" type="error" />);
    const messageElement = screen.getByText('Something went wrong!');
    expect(messageElement).toBeInTheDocument();
    expect(messageElement).toHaveClass('text-red-600');
  });
});