import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BroadcastForm from './BroadcastForm';

test('calls onSend with correct values', () => {
const onSendMock = jest.fn();
render(<BroadcastForm onSend={onSendMock} />);

fireEvent.change(screen.getByPlaceholderText(/Subject/i), {
target: { value: 'Test Subject' },
});
fireEvent.change(screen.getByPlaceholderText(/Type your broadcast message/i), {
target: { value: 'Test Message' },
});

fireEvent.click(screen.getByText(/Send Broadcast/i));

expect(onSendMock).toHaveBeenCalledWith('Test Subject', 'Test Message');
});
