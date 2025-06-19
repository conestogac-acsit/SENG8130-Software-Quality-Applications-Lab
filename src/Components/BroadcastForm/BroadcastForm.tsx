import React, { useState, useCallback } from 'react';

interface BroadcastFormProps {
  onSend: (subject: string, message: string) => void;
}

export default function BroadcastForm({ onSend }: BroadcastFormProps) {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSend = useCallback(() => {
    if (subject && message) {
      onSend(subject, message);
      setSubject('');
      setMessage('');
    }
  }, [onSend, subject, message]);

  return (
    <div>
      <input
        placeholder="Subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      />
      <textarea
        placeholder="Type your broadcast message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={handleSend}>Send Broadcast</button>
    </div>
  );
}
