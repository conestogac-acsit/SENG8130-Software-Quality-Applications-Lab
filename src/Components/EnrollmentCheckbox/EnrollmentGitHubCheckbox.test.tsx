// src/components/EnrollmentCheckbox.test.tsx
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import EnrollmentCheckbox from './EnrollmentGitHubCheckbox';

describe('EnrollmentCheckbox', () => {
  it('renders with label and default state', () => {
    const { getByLabelText } = render(
      <EnrollmentCheckbox label="Enroll in GitHub" onCheckChange={() => {}} />
    );
    expect(getByLabelText(/Enroll in GitHub/i)).not.toBeChecked();
  });

  it('triggers onCheckChange on toggle', () => {
    const handleCheck = jest.fn();
    const { getByLabelText } = render(
      <EnrollmentCheckbox label="Enroll in GitHub" onCheckChange={handleCheck} />
    );

    const checkbox = getByLabelText(/Enroll in GitHub/i);
    fireEvent.click(checkbox);
    expect(handleCheck).toHaveBeenCalledWith(true);
  });
});