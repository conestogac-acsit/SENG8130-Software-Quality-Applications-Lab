// src/components/CenteredFormContainer.test.tsx
import React from 'react';
import { render } from '@testing-library/react';
import CenteredFormContainer from './CenteredFormContainer';

describe('CenteredFormContainer', () => {
  it('renders child content', () => {
    const { getByText } = render(
      <CenteredFormContainer>
        <p>Form Content</p>
      </CenteredFormContainer>
    );
    expect(getByText('Form Content')).toBeInTheDocument();
  });

  it('calls onMount once on load', () => {
    const mockMount = jest.fn();
    render(
      <CenteredFormContainer onMount={mockMount}>
        <div>Test</div>
      </CenteredFormContainer>
    );
    expect(mockMount).toHaveBeenCalledTimes(1);
});
});