/**
 * Here I am extracting the header (column names) from a CSV string.
 */
export function extractCSVColumns(csvText: string): string[] {
  if (!csvText) return [];

  const [headerLine] = csvText.trim().split('\n');
  return headerLine.split(',').map(header => header.trim());
}
