// src/components/CenteredFormContainer.tsx
import React, { useEffect } from 'react';

interface CenteredFormContainerProps {
  children: React.ReactNode;
  onMount?: () => void;
}

const CenteredFormContainer: React.FC<CenteredFormContainerProps> = ({ children, onMount }) => {
  useEffect(() => {
    if (onMount) onMount(); // automation via useEffect
  }, [onMount]);

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#f9f9f9'
    }}>
      <div style={{
        padding: '24px',
        borderRadius: '8px',
        backgroundColor: '#fff',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        minWidth: '320px'
      }}>
        {children}
      </div>
    </div>
  );
};

export default CenteredFormContainer;