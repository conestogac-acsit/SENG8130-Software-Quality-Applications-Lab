import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import FeedbackForm from './FeedbackForm';
import { LocalStorage } from '../localStorageService';

jest.mock('../localStorageService', () => {
  return {
    LocalStorage: jest.fn().mockImplementation(() => {
      let store: any[] = [];
      return {
        load: jest.fn(() => store),
        save: jest.fn((key, data) => {
          store = data;
        }),
      };
    }),
  };
});

jest.mock('../Components/Button/Button', () => {
  return ({ onClick, label }: any) => (
    <button onClick={onClick}>{label}</button>
  );
});

describe('FeedbackForm Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render feedback toggle button', () => {
    render(<FeedbackForm />);
    expect(screen.getByRole('button', { name: '📝' })).toBeInTheDocument();
  });

  it('should open the feedback popup when clicked', () => {
    render(<FeedbackForm />);
    fireEvent.click(screen.getByText('📝'));
    expect(screen.getByText('Give Feedback')).toBeInTheDocument();
  });

  it('should select emoji and enter comment', () => {
    render(<FeedbackForm />);
    fireEvent.click(screen.getByText('📝'));

    const emoji = screen.getAllByRole('button', { name: /Rate/ })[2];
    fireEvent.click(emoji);
    expect(emoji).toHaveClass('scale-125');

    const textarea = screen.getByPlaceholderText(/Leave a comment/i);
    fireEvent.change(textarea, { target: { value: 'Great tool!' } });
    expect(textarea).toHaveValue('Great tool!');
  });

  it('should submit feedback and show thank-you message', async () => {
    render(<FeedbackForm />);
    fireEvent.click(screen.getByText('📝'));

    const emoji = screen.getAllByRole('button', { name: /Rate/ })[4];
    fireEvent.click(emoji);

    const textarea = screen.getByPlaceholderText(/Leave a comment/i);
    fireEvent.change(textarea, { target: { value: 'Loving it!' } });

    fireEvent.click(screen.getByText('Submit'));

    await waitFor(() => {
      expect(screen.getByText(/thank you for your feedback/i)).toBeInTheDocument();
    });
  });

  it('should not allow submission without selecting emoji', () => {
    render(<FeedbackForm />);
    fireEvent.click(screen.getByText('📝'));

    const submit = screen.getByText('Submit');
    expect(submit).toBeDisabled();
  });

  it('should close when clicking the close button (×)', () => {
    render(<FeedbackForm />);
    fireEvent.click(screen.getByText('📝'));

    fireEvent.click(screen.getByText('×'));
    expect(screen.queryByText('Give Feedback')).not.toBeInTheDocument();
  });

  it('should close the popup when clicking outside', () => {
    render(<div><FeedbackForm /><div data-testid="outside">Outside</div></div>);
    fireEvent.click(screen.getByText('📝'));

    fireEvent.mouseDown(screen.getByTestId('outside'));
    expect(screen.queryByText('Give Feedback')).not.toBeInTheDocument();
  });
});
