// src/components/Button.tsx
import React, { useEffect } from 'react';

interface ButtonProps {
  onClick?: () => void;
  onMount?: () => void;
  disabled?: boolean;
  label?: string;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  onMount,
  disabled = false,
  label = 'Enroll',
}) => {
  useEffect(() => {
    if (onMount) onMount();
  }, [onMount]);

  return (
    <button onClick={onClick} disabled={disabled} type="button">
      {label}
    </button>
  );
};

export default Button;
