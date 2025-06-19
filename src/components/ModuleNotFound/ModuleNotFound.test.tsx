import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ModuleNotFound from './ModuleNotFound';
import '@testing-library/jest-dom';

describe('ModuleNotFound Component', () => {
  it('renders the 404 heading and descriptive content', () => {
    render(
      <MemoryRouter>
        <ModuleNotFound />
      </MemoryRouter>
    );

    expect(screen.getByLabelText('404 - Page not found')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /Page Not Found/i })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/we couldn’t find the page/i)
    ).toBeInTheDocument();

    const homeLink = screen.getByRole('link', { name: /Go Back Home/i });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', '/');
  });
});
