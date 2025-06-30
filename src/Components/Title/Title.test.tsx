import React from 'react';
import { render, screen } from '@testing-library/react';
import Title from './Title';

describe('Title Component', () => {
  it('renders the correct heading text', () => {
    render(<Title />);
    expect(screen.getByText('Automated Student Enrollment Form')).toBeInTheDocument();
  });
});
