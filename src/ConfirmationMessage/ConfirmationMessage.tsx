import React from 'react';

interface ConfirmationMessageProps {
  message: string;
  type: 'success' | 'error';
}

const ConfirmationMessage: React.FC<ConfirmationMessageProps> = ({ message, type }) => {
  if (!message) return null;
  const color = type === 'success' ? 'text-green-600' : 'text-red-600';
  return <p className={`mt-2 ${color}`}>{message}</p>;
};

export default ConfirmationMessage;