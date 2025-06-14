// src/components/EnrollmentCheckbox.tsx
import React, { useEffect, useState } from 'react';

interface EnrollmentCheckboxProps {
  label: string;
  onCheckChange: (checked: boolean) => void;
  defaultChecked?: boolean;
}

const EnrollmentCheckbox: React.FC<EnrollmentCheckboxProps> = ({ label, onCheckChange, defaultChecked = false }) => {
  const [checked, setChecked] = useState(defaultChecked);

  useEffect(() => {
    onCheckChange(checked);
  }, [checked, onCheckChange]);

  return (
    <label style={{ display: 'block', margin: '8px 0' }}>
      <input
        type="checkbox"
        checked={checked}
        onChange={() => setChecked(!checked)}
        style={{ marginRight: '8px' }}
      />
      {label}
    </label>
  );
};

export default EnrollmentCheckbox;