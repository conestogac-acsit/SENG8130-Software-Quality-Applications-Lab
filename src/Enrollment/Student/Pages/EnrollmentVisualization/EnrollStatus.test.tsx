import React from 'react';
import { render, screen } from '@testing-library/react';
import EnrollStatus from './EnrollStatus';

//ResizeObserver is a built-in browser API used to detect element size changes.
// Recharts relies on it for rendering responsive charts.
// Since Jest (jsdom) doesn't include it, we mock it below to avoid test failures.
global.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
};

describe('EnrollStatus Dashboard - Basic Tests', () => {
test('renders enrollment dashboard title', async () => {
  render(<EnrollStatus />);
  
  const title = await screen.findByText(/Enrollment Status Overview/i);
  expect(title).toBeInTheDocument();
});
test('shows total students count', async () => {
  render(<EnrollStatus />);
  
  const studentCount = await screen.findByText(/Total Students:/i);
  expect(studentCount).toBeInTheDocument();
});
test('displays GitHub enrollment section', async () => {
  render(<EnrollStatus />);
  
  const githubSection = await screen.findByText(/GitHub Enrollment/i);
  expect(githubSection).toBeInTheDocument();
});
test('displays Loop enrollment section', async () => {
  render(<EnrollStatus />);
  
  const loopSection = await screen.findByText(/Loop Enrollment/i);
  expect(loopSection).toBeInTheDocument();
});
  });