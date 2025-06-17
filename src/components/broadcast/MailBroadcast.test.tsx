/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import BroadcastMessage from './MailBroadcast';

// Mock Electron's ipcRenderer
const mockInvoke = jest.fn();
beforeAll(() => {
  (window as any).require = () => ({
    ipcRenderer: { invoke: mockInvoke }
  });
});

beforeEach(() => {
  mockInvoke.mockReset();
});

describe('BroadcastMessage component', () => {
  test('renders subject textbox, message textarea, and send button', () => {
    render(<BroadcastMessage />);
    expect(screen.getByPlaceholderText(/Subject/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Type your broadcast message/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Send Broadcast/i })).toBeInTheDocument();
  });

  test('typing into fields updates their values', () => {
    render(<BroadcastMessage />);
    const subjectInput = screen.getByPlaceholderText(/Subject/i);
    const messageInput = screen.getByPlaceholderText(/Type your broadcast message/i);

    fireEvent.change(subjectInput, { target: { value: 'Test subject' } });
    fireEvent.change(messageInput, { target: { value: 'Hello world' } });

    expect((subjectInput as HTMLInputElement).value).toBe('Test subject');
    expect((messageInput as HTMLTextAreaElement).value).toBe('Hello world');
  });

  test('successful send displays "Sent!" status', async () => {
    mockInvoke.mockResolvedValueOnce({ success: true });

    render(<BroadcastMessage />);
    fireEvent.change(screen.getByPlaceholderText(/Subject/i), { target: { value: 'Hi' } });
    fireEvent.change(screen.getByPlaceholderText(/Type your broadcast message/i), { target: { value: 'Hello' } });

    fireEvent.click(screen.getByRole('button', { name: /Send Broadcast/i }));

    expect(screen.getByText(/Sending\.\.\./i)).toBeInTheDocument();

    await waitFor(() => {
      expect(mockInvoke).toHaveBeenCalledWith(
        'sendBroadcast',
        { subject: 'Hi', message: 'Hello' }
      );
    });

    expect(screen.getByText(/Sent!/i)).toBeInTheDocument();
  });

  test('failed send displays error message', async () => {
    mockInvoke.mockResolvedValueOnce({ success: false, error: 'oops' });

    render(<BroadcastMessage />);
    fireEvent.change(screen.getByPlaceholderText(/Subject/i), { target: { value: 'Err' } });
    fireEvent.change(screen.getByPlaceholderText(/Type your broadcast message/i), { target: { value: 'Bad' } });

    fireEvent.click(screen.getByRole('button', { name: /Send Broadcast/i }));

    expect(screen.getByText(/Sending\.\.\./i)).toBeInTheDocument();

    await waitFor(() => {
      expect(mockInvoke).toHaveBeenCalledWith(
        'sendBroadcast',
        { subject: 'Err', message: 'Bad' }
      );
    });

    expect(screen.getByText(/Error:/i)).toBeInTheDocument();
  });

  test('unexpected rejection shows thrown error', async () => {
    mockInvoke.mockRejectedValueOnce(new Error('fail'));

    render(<BroadcastMessage />);
    fireEvent.change(screen.getByPlaceholderText(/Subject/i), { target: { value: 'Ex' } });
    fireEvent.change(screen.getByPlaceholderText(/Type your broadcast message/i), { target: { value: 'Err' } });

    fireEvent.click(screen.getByRole('button', { name: /Send Broadcast/i }));

    await waitFor(() => {
      expect(mockInvoke).toHaveBeenCalled();
    });

    expect(screen.getByText(/Unexpected error: /i)).toBeInTheDocument();
  });
});