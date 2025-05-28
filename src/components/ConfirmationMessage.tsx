// --- File: src/components/ConfirmationMessage.tsx ---
// Optional reusable component to display messages.
// Could support User Story 1.1 and 1.2 for showing feedback.
import React from 'react';

interface Props {
  message: string;
  type: 'success' | 'error';
}

const ConfirmationMessage: React.FC<Props> = ({ message, type }) => {
  if (!message) return null;
  const color = type === 'success' ? 'text-green-600' : 'text-red-600';
  return <p className={`mt-2 ${color}`}>{message}</p>;
};

export default ConfirmationMessage;