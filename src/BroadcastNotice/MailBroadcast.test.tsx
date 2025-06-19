import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MailBroadcast from './MailBroadcast';

describe('MailBroadcast', () => {
  test('renders send button and input fields via BroadcastForm', () => {
    render(<MailBroadcast />);
    expect(screen.getByPlaceholderText(/Subject/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Type your broadcast message/i)).toBeInTheDocument();
    expect(screen.getByText(/Send Broadcast/i)).toBeInTheDocument();
  });

  test('shows "Sending..." and then "Sent!" when inputs are valid', async () => {
    render(<MailBroadcast />);
    const subjectInput = screen.getByPlaceholderText(/Subject/i);
    const messageInput = screen.getByPlaceholderText(/Type your broadcast message/i);

    await userEvent.type(subjectInput, 'Hello');
    await userEvent.type(messageInput, 'Test message');
    await userEvent.click(screen.getByText(/Send Broadcast/i));

    expect(screen.getByText(/Sending.../i)).toBeInTheDocument();
    const sentText = await screen.findByText(/Sent!/i, {}, { timeout: 2000 });
    expect(sentText).toBeInTheDocument();
  });
});
