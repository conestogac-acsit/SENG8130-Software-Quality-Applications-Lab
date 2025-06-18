
import React, { useState } from 'react';

// Simulated components
function BroadcastForm({ onSend }: { onSend: (s: string, m: string) => void }) {
  return (
    <div>
      <button onClick={() => onSend('Default Subject', 'Default Message')}>
        Send Broadcast
      </button>
    </div>
  );
}

function StatusMessage({ message }: { message: string }) {
  return <p>{message}</p>;
}

export default function MailBroadcast() {
  const [status, setStatus] = useState('');

  const send = async (subject: string, message: string) => {
    setStatus('Sending...');
    await new Promise((res) => setTimeout(res, 500));
    setStatus('Sent!');
  };

  return (
    <div>
      <BroadcastForm onSend={send} />
      <StatusMessage message={status} />
    </div>
  );
}
