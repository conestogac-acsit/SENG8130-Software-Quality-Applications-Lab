/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import BroadcastMessage from './MailBroadcast';
import * as mailModule from './broadcast'; // adjust path as needed

describe('BroadcastMessage component', () => {
  // Mock sendEmail in the mail module
  const sendEmailSpy = jest.spyOn(mailModule, 'sendEmail');

  beforeEach(() => {
    sendEmailSpy.mockReset();
  });

  test('renders subject, message, and send button', () => {
    render(<BroadcastMessage />);
    expect(screen.getByPlaceholderText(/Subject/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Type your broadcast message/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Send Broadcast/i })).toBeInTheDocument();
  });

  test('updates input fields correctly', () => {
    render(<BroadcastMessage />);
    const subjectInput = screen.getByPlaceholderText(/Subject/i);
    const messageInput = screen.getByPlaceholderText(/Type your broadcast message/i);

    fireEvent.change(subjectInput, { target: { value: 'New Subject' } });
    fireEvent.change(messageInput, { target: { value: 'Hello Content' } });

    expect((subjectInput as HTMLInputElement).value).toBe('New Subject');
    expect((messageInput as HTMLTextAreaElement).value).toBe('Hello Content');
  });

  test('successful submission shows "Sent!"', async () => {
    sendEmailSpy.mockResolvedValueOnce({ success: true });

    render(<BroadcastMessage />);
    fireEvent.change(screen.getByPlaceholderText(/Subject/i), { target: { value: 'Test' } });
    fireEvent.change(screen.getByPlaceholderText(/Type your broadcast message/i), { target: { value: 'Body' } });

    fireEvent.click(screen.getByRole('button', { name: /Send Broadcast/i }));

    expect(screen.getByText(/Sending\.\.\./i)).toBeInTheDocument();

    await waitFor(() => {
      expect(sendEmailSpy).toHaveBeenCalledWith('Test', 'Body');
    });

    expect(screen.getByText(/Sent!/i)).toBeInTheDocument();
  });

  test('failed send shows error message', async () => {
    sendEmailSpy.mockResolvedValueOnce({ success: false, error: 'failure' });

    render(<BroadcastMessage />);
    fireEvent.change(screen.getByPlaceholderText(/Subject/i), { target: { value: 'Subj' } });
    fireEvent.change(screen.getByPlaceholderText(/Type your broadcast message/i), { target: { value: 'Message' } });

    fireEvent.click(screen.getByRole('button', { name: /Send Broadcast/i }));

    await waitFor(() => {
      expect(sendEmailSpy).toHaveBeenCalledWith('Subj', 'Message');
    });

    expect(screen.getByText(/Error:/i)).toBeInTheDocument();
  });

  test('thrown exception shows unexpected error message', async () => {
    sendEmailSpy.mockRejectedValueOnce(new Error('fatal'));

    render(<BroadcastMessage />);
    fireEvent.change(screen.getByPlaceholderText(/Subject/i), { target: { value: 'X' } });
    fireEvent.change(screen.getByPlaceholderText(/Type your broadcast message/i), { target: { value: 'Y' } });

    fireEvent.click(screen.getByRole('button', { name: /Send Broadcast/i }));

    await waitFor(() => {
      expect(sendEmailSpy).toHaveBeenCalledWith('X', 'Y');
    });

    expect(screen.getByText(/Unexpected error:/i)).toBeInTheDocument();
    expect(screen.getByText(/Error:/i)).toBeInTheDocument();
  });
});