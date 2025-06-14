import React, { useEffect } from 'react';

interface EnrollButtonProps {
  onClick?: () => void;
  onMount?: () => void;
  disabled?: boolean;
  label?: string;
}

const EnrollButton: React.FC<EnrollButtonProps> = ({
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

export default EnrollButton;
