import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import App from '../App';

describe('Accessibility tests for <App />', () => {
  it('should have no accessibility violations', async () => {
    const { container } = render(<App />);
    const results = await axe(container);
    expect(results.violations.length).toBe(0);
  });
});

