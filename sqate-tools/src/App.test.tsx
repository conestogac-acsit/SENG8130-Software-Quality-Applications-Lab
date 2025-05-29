import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders App component', () => {
  render(<App />);
  // Validate the presence of the main title
  expect(screen.getByText(/SQATE Desktop Tool/i)).toBeInTheDocument();
  // Validate the presence of the Welcome Message
   expect(
    screen.getByText(/Welcome! This is the desktop shell for SQATE tooling modules./i)
  ).toBeInTheDocument();
});
