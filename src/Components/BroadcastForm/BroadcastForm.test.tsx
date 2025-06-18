import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BroadcastForm from './BroadcastForm';

describe('BroadcastForm', () => {
  test('calls onSend with correct values', async () => {
    const user = userEvent.setup();
    const onSendMock = jest.fn();
    render(<BroadcastForm onSend={onSendMock} />);

    await user.click(screen.getByPlaceholderText(/Subject/i));
    await user.type(screen.getByPlaceholderText(/Subject/i), 'Test Subject');

    await user.click(screen.getByPlaceholderText(/Type your broadcast message/i));
    await user.type(screen.getByPlaceholderText(/Type your broadcast message/i), 'Test Message');

    await user.click(screen.getByText(/Send Broadcast/i));

    expect(onSendMock).toHaveBeenCalledWith('Test Subject', 'Test Message');
  });

  test('does not call onSend if subject is missing', async () => {
    const user = userEvent.setup();
    const onSendMock = jest.fn();
    render(<BroadcastForm onSend={onSendMock} />);

    await user.type(screen.getByPlaceholderText(/Type your broadcast message/i), 'Only message');
    await user.click(screen.getByText(/Send Broadcast/i));

    expect(onSendMock).not.toHaveBeenCalled();
  });

  test('does not call onSend if message is missing', async () => {
    const user = userEvent.setup();
    const onSendMock = jest.fn();
    render(<BroadcastForm onSend={onSendMock} />);

    await user.type(screen.getByPlaceholderText(/Subject/i), 'Only subject');
    await user.click(screen.getByText(/Send Broadcast/i));

    expect(onSendMock).not.toHaveBeenCalled();
  });

  test('does not call onSend if both subject and message are missing', async () => {
    const user = userEvent.setup();
    const onSendMock = jest.fn();
    render(<BroadcastForm onSend={onSendMock} />);

    await user.click(screen.getByText(/Send Broadcast/i));

    expect(onSendMock).not.toHaveBeenCalled();
  });
});
