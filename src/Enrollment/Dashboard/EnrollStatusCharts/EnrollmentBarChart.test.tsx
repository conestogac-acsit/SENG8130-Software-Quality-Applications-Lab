import React from 'react';
import { render, screen } from '@testing-library/react';
import EnrollmentBarChart from './EnrollmentBarChart';

const testData = [
  { platform: 'GitHub', Enrolled: 10, Unenrolled: 5, Total: 15 },
  { platform: 'Loop', Enrolled: 12, Unenrolled: 3, Total: 15 }
];
describe('EnrollmentBarChart', () => {
  test('renders svg element', () => {
    const { container } = render(<EnrollmentBarChart data={testData} />);
    const svg = container.querySelector('svg');
    expect(svg).not.toBeNull();
  });
   test('renders bar rects', () => {
    const { container } = render(<EnrollmentBarChart data={testData} />);
    const rects = container.querySelectorAll('rect');
    expect(rects.length).toBeGreaterThan(0);
  });
