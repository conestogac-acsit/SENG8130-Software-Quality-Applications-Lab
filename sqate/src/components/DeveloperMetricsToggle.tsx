import React, { useState, useEffect } from 'react';
import { initPerformanceLogging } from '../utils/performanceLogger';

const DeveloperMetricsToggle: React.FC = () => {
  const [enabled, setEnabled] = useState<boolean>(false);
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    if (enabled) {
      initPerformanceLogging((msg) => {
        setLogs((prevLogs) => [...prevLogs, msg]);
      });
    } else {
      setLogs([]);
    }
  }, [enabled]);

  return (
    <div style={{ position: 'fixed', top: 10, right: 10, zIndex: 1000 }}>
      <button
        onClick={() => setEnabled(!enabled)}
        style={{
          padding: '6px 12px',
          backgroundColor: enabled ? '#880808' : '#1E90FF',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        {enabled ? 'Hide Metrics' : 'Show Metrics'}
      </button>
      {enabled && (
        <div
          style={{
            background: '#1a1a1a',
            color: '#0f0',
            padding: '10px',
            marginTop: '8px',
            maxHeight: '250px',
            overflowY: 'auto',
            fontSize: '0.85rem',
            border: '1px solid #444',
            borderRadius: '4px'
          }}
        >
          <strong>Performance Metrics:</strong>
          <ul>
            {logs.map((log, idx) => (
              <li key={idx}>{log}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DeveloperMetricsToggle; 