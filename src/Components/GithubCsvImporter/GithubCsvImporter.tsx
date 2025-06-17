// src/components/GithubCsvImporter.tsx
import React, { useState, useEffect } from 'react';

const GithubCsvImporter: React.FC = () => {
  const [csvData, setCsvData] = useState<string[][]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const lines = (reader.result as string).split('\n');
      const data = lines.map((line) => line.split(','));
      setCsvData(data);
    };
    reader.readAsText(file);
  };

  useEffect(() => {
    if (csvData.length > 0) {
      console.log('CSV Data imported:', csvData);
    }
  }, [csvData]);

  return (
    <div>
      <label htmlFor="csv-upload">Import GitHub CSV:</label>
      <input id="csv-upload" type="file" accept=".csv" onChange={handleFileChange} />
      {csvData.length > 0 && (
        <ul>
          {csvData.map((row, i) => (
            <li key={i}>{row.join(' | ')}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GithubCsvImporter;