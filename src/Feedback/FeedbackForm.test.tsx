import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FeedbackForm from './FeedbackForm';

describe('FeedbackForm', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        status: 200,
        json: () => Promise.resolve({}),
      })
    ) as jest.Mock;
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('renders floating feedback button', async () => {
    render(<FeedbackForm />);
    expect(screen.getByRole('button', { name: /📝/i })).toBeInTheDocument();
  });

  test('opens and closes the feedback popup', async () => {
    render(<FeedbackForm />);
    const user = userEvent.setup();

    await user.click(screen.getByRole('button', { name: /📝/i }));
    expect(screen.getByText(/Give Feedback/i)).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /×/i }));
    expect(screen.queryByText(/Give Feedback/i)).not.toBeInTheDocument();
  });

  test('submit button is disabled until rating is selected', async () => {
    render(<FeedbackForm />);
    const user = userEvent.setup();

    await user.click(screen.getByRole('button', { name: /📝/i }));
    const submitBtn = screen.getByRole('button', { name: /Submit/i });
    expect(submitBtn).toBeDisabled();
  });

  test('enables submit button after selecting emoji', async () => {
    render(<FeedbackForm />);
    const user = userEvent.setup();

    await user.click(screen.getByRole('button', { name: /📝/i }));
    await user.click(screen.getByLabelText('Rate 4'));

    const submitBtn = screen.getByRole('button', { name: /Submit/i });
    expect(submitBtn).toBeEnabled();
  });

  test('submits feedback and shows success message', async () => {
    render(<FeedbackForm />);
    const user = userEvent.setup();

    await user.click(screen.getByRole('button', { name: /📝/i }));
    await user.click(screen.getByLabelText('Rate 5'));
    await user.type(screen.getByPlaceholderText(/Leave a comment/i), 'Excellent tool!');

    await user.click(screen.getByRole('button', { name: /Submit/i }));

    await waitFor(() => {
      expect(screen.getByText(/Thank you for your feedback/i)).toBeInTheDocument();
    });
  });
});
