export const handleFileNotFound = (): void => {
  console.error("Error: No file selected.");
  alert("🚫 No file chosen. Please select a CSV file to upload.");
};

export const handleGenericError = (message: string): void => {
  console.error("Error:", message);
  alert(`⚠ An error occurred: ${message}`);
};
