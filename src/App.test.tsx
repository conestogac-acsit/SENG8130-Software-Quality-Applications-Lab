import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import EnrollmentDashboard from './Enrollment/Dashboard/Dashboard';
import EvaluationCard from './Dashboard/EvaluationCard';
import ModuleNotFound from './Components/ModuleNotFound';

jest.mock('./Dashboard/EnrollmentCard', () => () => <div>EnrollmentCard Component</div>);
jest.mock('./Dashboard/EvaluationCard', () => () => <div>EvaluationCard Component</div>);
jest.mock('./Enrollment/Dashboard/Dashboard', () => () => <div>EnrollmentDashboard Component</div>);
jest.mock('./Components/ModuleNotFound', () => () => <div>ModuleNotFound Component</div>);

describe('App Component', () => {
  test('renders Home page with correct text and cards', () => {
    render(<App />);
    expect(screen.getByText(/SQATE Desktop Tool/i)).toBeInTheDocument();
    expect(screen.getByText(/Welcome! This is the desktop shell for SQATE tooling modules./i)).toBeInTheDocument();
    expect(screen.getByText(/EnrollmentCard Component/i)).toBeInTheDocument();
    expect(screen.getByText(/EvaluationCard Component/i)).toBeInTheDocument();
  });

  test('renders EnrollmentDashboard component on /enrollment route', () => {
    render(
      <MemoryRouter initialEntries={['/enrollment']}>
        <Routes>
          <Route path="/enrollment" element={<EnrollmentDashboard />} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText(/EnrollmentDashboard Component/i)).toBeInTheDocument();
  });

  test('renders EvaluationCard component on /evaluation route', () => {
    render(
      <MemoryRouter initialEntries={['/evaluation']}>
        <Routes>
          <Route path="/evaluation" element={<EvaluationCard />} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText(/EvaluationCard Component/i)).toBeInTheDocument();
  });

  test('renders ModuleNotFound component on unknown route', () => {
    render(
      <MemoryRouter initialEntries={['/unknown-route']}>
        <Routes>
          <Route path="*" element={<ModuleNotFound />} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText(/ModuleNotFound Component/i)).toBeInTheDocument();
  });
});
