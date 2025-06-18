import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import MailBroadcast from './MailBroadcast';

describe('MailBroadcast Component', () => {
test('renders Send Broadcast button', () => {
render(<MailBroadcast />);
expect(screen.getByText(/Send Broadcast/i)).toBeInTheDocument();
});

test('shows "Sending..." immediately after clicking send', () => {
render(<MailBroadcast />);
fireEvent.click(screen.getByText(/Send Broadcast/i));
expect(screen.getByText(/Sending.../i)).toBeInTheDocument();
});

test('updates status to "Sent!" after async delay', async () => {
render(<MailBroadcast />);
fireEvent.click(screen.getByText(/Send Broadcast/i));
await waitFor(() => {
expect(screen.getByText(/Sent!/i)).toBeInTheDocument();
});
});
});