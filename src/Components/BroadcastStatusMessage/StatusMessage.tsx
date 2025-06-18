import React from 'react';

interface StatusProps {
  message: string;
  maxLength?: number;
}

export default function StatusMessage({ message, maxLength = 500 }: StatusProps) {
  
  const trimmedMessage = message.trim();

  if (!trimmedMessage) return null;

  if (trimmedMessage.length > maxLength) {
    return <p style={{ color: 'red' }}>Error: Message exceeds {maxLength} characters.</p>;
  }

  return <p>{trimmedMessage}</p>;
}