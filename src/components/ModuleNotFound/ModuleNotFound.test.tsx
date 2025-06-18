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
   // Check for 404 label
   expect(screen.getByLabelText('404 - Page not found')).toBeInTheDocument();
   // Check for heading text
   expect(screen.getByRole('heading', { name: /Page Not Found/i })).toBeInTheDocument();
   // Check for descriptive text
   expect(screen.getByText(/we couldn’t find the page/i)).toBeInTheDocument();
   // Check for the home navigation link
   const homeLink = screen.getByRole('link', { name: /Go Back Home/i });
   expect(homeLink).toBeInTheDocument();
   expect(homeLink).toHaveAttribute('href', '/');
 });
});