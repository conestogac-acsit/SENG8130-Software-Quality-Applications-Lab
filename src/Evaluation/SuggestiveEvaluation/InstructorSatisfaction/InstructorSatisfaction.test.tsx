import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { InstructorSatisfaction } from './InstructorSatisfaction';

describe('InstructorSatisfaction Component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('renders the title correctly', () => {
    render(<InstructorSatisfaction />);
    expect(screen.getByText('⭐ Instructor Satisfaction')).toBeInTheDocument();
  });

  test('renders 5 stars', () => {
    render(<InstructorSatisfaction />);
    const stars = screen.getAllByText('⭐');
    expect(stars.length).toBe(5);
  });

  test('clicking a star highlights the correct number', () => {
    render(<InstructorSatisfaction />);
    const stars = screen.getAllByText('⭐');
    fireEvent.click(stars[3]); // Click the 4th star
    const updatedStars = screen.getAllByText('⭐');
    expect(updatedStars[0]).toHaveClass('text-yellow-400');
    expect(updatedStars[3]).toHaveClass('text-yellow-400');
    expect(updatedStars[4]).toHaveClass('text-gray-300');
  });

  test('stores selected rating in localStorage', () => {
    render(<InstructorSatisfaction />);
    const stars = screen.getAllByText('⭐');
    fireEvent.click(stars[2]);
    expect(localStorage.getItem('instructorRating')).toBe('3');
  });
});