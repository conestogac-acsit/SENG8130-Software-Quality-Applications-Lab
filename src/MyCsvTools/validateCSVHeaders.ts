export function validateCSVHeaders(csvText: string, requiredHeaders: string[]): boolean {
  const [headerLine] = csvText.trim().split('\n');
  const headers = headerLine.split(',').map(h => h.trim().toLowerCase());
  return requiredHeaders.every(required =>
    headers.includes(required.toLowerCase())
  );
}
