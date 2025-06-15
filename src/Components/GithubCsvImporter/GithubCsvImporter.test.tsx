// src/components/GithubCsvImporter.test.tsx
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import GithubCsvImporter from './GithubCsvImporter';

function createCSVFile(content: string): File {
  return new File([content], 'test.csv', { type: 'text/csv' });
}

describe('GithubCsvImporter', () => {
  it('renders file input and uploads CSV', async () => {
    const { getByLabelText, getByText } = render(<GithubCsvImporter />);
    const fileInput = getByLabelText(/import github csv/i);

    const csv = 'Name,Email\nAlice,alice@example.com\nBob,bob@example.com';
    const file = createCSVFile(csv);

    fireEvent.change(fileInput, { target: { files: [file] } });

    await waitFor(() => {
      expect(getByText(/Alice/)).toBeInTheDocument();
      expect(getByText(/Bob/)).toBeInTheDocument();
 });
});
});