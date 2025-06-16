import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders App component', () => {
  render(<App />);
  
  expect(screen.getByText(/SQATE Desktop Tool/i)).toBeInTheDocument();
  
   expect(
    screen.getByText(/Welcome! This is the desktop shell for SQATE tooling modules./i)
  ).toBeInTheDocument();
});
