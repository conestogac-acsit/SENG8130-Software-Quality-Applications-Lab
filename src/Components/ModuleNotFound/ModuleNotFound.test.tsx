import React, { Suspense, lazy } from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
const ModuleNotFound = lazy(() => import('./ModuleNotFound'));
function Home() {
  return (
    <div>
      <h1>SQATE Desktop Tool</h1>
      <p>Welcome! This is the desktop shell for SQATE tooling modules.</p>
    </div>
  );
}
describe('ModuleNotFound Component', () => {
  it('renders the 404 heading and descriptive content', async () => {
    render(
      <MemoryRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <ModuleNotFound />
        </Suspense>
      </MemoryRouter>
    );
    expect(await screen.findByText(/^404$/)).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Page Not Found/i })).toBeInTheDocument();
    expect(screen.getByText(/we couldn’t find the page/i)).toBeInTheDocument();
    const homeLink = screen.getByRole('link', { name: /Go Back Home/i });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', '/');
  });

  it('navigates to home when clicking the "Go Back Home" link', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={['/some/bad/path']}>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<ModuleNotFound />} />
          </Routes>
        </Suspense>
      </MemoryRouter>
    );
    expect(await screen.findByRole('heading', { name: /Page Not Found/i })).toBeInTheDocument();
    const homeLink = screen.getByRole('link', { name: /Go Back Home/i });
    await user.click(homeLink);
    expect(screen.getByText(/SQATE Desktop Tool/i)).toBeInTheDocument();
    expect(screen.getByText(/desktop shell for SQATE tooling modules/i)).toBeInTheDocument();
  });
});
