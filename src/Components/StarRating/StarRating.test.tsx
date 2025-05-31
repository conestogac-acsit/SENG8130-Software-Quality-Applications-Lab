import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import StarRating from './StarRating';

describe('StarRating', () => {
  it('renders 5 stars', () => {
    const { getAllByTestId } = render(
      <StarRating rating={0} hover={0} onClick={() => {}} onHover={() => {}} onLeave={() => {}} />
    );
    const stars = getAllByTestId(/star-/);
    expect(stars.length).toBe(5);
  });

  it('highlights stars on hover', () => {
    const { getByTestId } = render(
      <StarRating rating={0} hover={0} onClick={() => {}} onHover={() => {}} onLeave={() => {}} />
    );
    const star3 = getByTestId('star-3');
    fireEvent.mouseEnter(star3);
    // Visual behavior is not verifiable directly here, but you can check if handlers are called.
  });

  it('calls onClick with correct star value', () => {
    const handleClick = jest.fn();
    const { getByTestId } = render(
      <StarRating rating={0} hover={0} onClick={handleClick} onHover={() => {}} onLeave={() => {}} />
    );
    const star4 = getByTestId('star-4');
    fireEvent.click(star4);
    expect(handleClick).toHaveBeenCalledWith(4);
  });
});
