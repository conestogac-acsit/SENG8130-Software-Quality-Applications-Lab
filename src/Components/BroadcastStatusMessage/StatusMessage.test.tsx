import React from 'react';
import { render, screen } from '@testing-library/react';
import StatusMessage from './StatusMessage';

describe('StatusMessage', () => {
  test('renders valid message', () => {
    render(<StatusMessage message="Success!" />);
    expect(screen.getByText('Success!')).toBeInTheDocument();
  });

  test('ignores empty or whitespace-only message', () => {
    const { container } = render(<StatusMessage message="   " />);
    expect(container).toBeEmptyDOMElement();
  });

  test('renders error if message exceeds maxLength', () => {
    const longText = 'a'.repeat(501);
    render(<StatusMessage message={longText} maxLength={500} />);
    expect(screen.getByText(/Message exceeds/)).toBeInTheDocument();
  });
});