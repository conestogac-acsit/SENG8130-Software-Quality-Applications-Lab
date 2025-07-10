import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import OptInCheckbox from './OptInCheckbox';

describe('OptInCheckbox', () => {
  it('renders with the correct label', () => {
    const { getByLabelText } = render(
      <OptInCheckbox id="optin" label="Opt in for updates" />
    );
    expect(getByLabelText('Opt in for updates')).toBeInTheDocument();
  });

  it('toggles checked state on click and triggers onChange', () => {
    const handleChange = jest.fn();
    const { getByLabelText } = render(
      <OptInCheckbox id="optin" label="Opt in for updates" onChange={handleChange} />
    );

    const checkbox = getByLabelText('Opt in for updates') as HTMLInputElement;

    // Click to check
    fireEvent.click(checkbox);
    expect(handleChange).toHaveBeenCalledWith(true);

    // Click to uncheck
    fireEvent.click(checkbox);
    expect(handleChange).toHaveBeenCalledWith(false);
  });
});