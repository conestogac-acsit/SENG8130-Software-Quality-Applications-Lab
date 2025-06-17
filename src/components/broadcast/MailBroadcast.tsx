import React, { useState } from 'react';
import {sendEmail} from './broadcast'
export default function BroadcastMessage() {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const sendBroadcast = async () => {
    setStatus('Sending...');
    try {
    const res:any = await sendEmail(subject,message)
      setStatus(res.success ? 'Sent!' : `Error: ${res.error}`);
    } catch (err) {
      setStatus(`Unexpected error: ${err}`);
    }
  };

  return (
    <div className="p-6 bg-white rounded shadow max-w-lg mx-auto space-y-4">
      <input
        type="text"
        placeholder="Subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        className="w-full border p-2 rounded"
      />
      <textarea
        rows={5}
        placeholder="Type your broadcast message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="w-full border p-2 rounded"
      />
      <button
        onClick={sendBroadcast}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Send Broadcast
      </button>
      {status && <div className="mt-1 text-sm text-gray-700">{status}</div>}
    </div>
  );
}
