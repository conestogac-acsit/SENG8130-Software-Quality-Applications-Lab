import React, { useState, useCallback } from 'react';
import BroadcastForm from '../Components/BroadcastForm/BroadcastForm';

export default function MailBroadcast() {
  const [status, setStatus] = useState('');

  const handleSend = useCallback(async (subject: string, message: string) => {
    const trimmedSubject = subject.trim();
    const trimmedMessage = message.trim();

    if (!trimmedSubject || !trimmedMessage) {
      setStatus('Error: Subject and message cannot be empty');
      return;
    }

    setStatus('Sending...');

    try {
      // Simulate asynchronous send
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setStatus('Sent!');
    } catch (err: any) {
      setStatus(`Error: ${err.message}`);
    }
  }, []);

  return (
    <div>
      <BroadcastForm onSend={handleSend} />
      {status && <p>{status}</p>}
    </div>
  );
}
