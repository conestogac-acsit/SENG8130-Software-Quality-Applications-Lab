import React from 'react';
import { render, screen } from '@testing-library/react';
import ModuleNotFound from './ModuleNotFound';
import '@testing-library/jest-dom';

describe('ModuleNotFound Component', () => {
  it('renders the 404 error message and key content', () => {
    render(<ModuleNotFound />);
    expect(screen.getByLabelText('404 - Page not found')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Module Not Found/i })).toBeInTheDocument();
    expect(screen.getByText(/we couldn’t find the module/i)).toBeInTheDocument();
    const homeLink = screen.getByRole('link', { name: /Go Back Home/i });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', '/');
  });
});
