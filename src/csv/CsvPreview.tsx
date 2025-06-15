import React from 'react';

interface Props {
  data: any[];
}

const CsvPreview: React.FC<Props> = ({ data }) => {
  if (data.length === 0) return <p>No data uploaded.</p>;
  const headers = Object.keys(data[0]);

  return (
    <table>
      <thead>
        <tr>
          {headers.map(h => <th key={h}>{h}</th>)}
        </tr>
      </thead>
      <tbody>
        {data.map((row, idx) => (
          <tr key={idx}>
            {headers.map(h => <td key={h}>{row[h]}</td>)}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CsvPreview;