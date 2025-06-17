import React from 'react';
import { render, screen } from '@testing-library/react';
import CenteredFormContainer from './CenteredFormContainer';

describe('CenteredFormContainer', () => {
  it('renders child content', () => {
    render(
      <CenteredFormContainer>
        <p>Form Content</p>
      </CenteredFormContainer>
    );
    expect(screen.getByText('Form Content')).toBeInTheDocument();
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
