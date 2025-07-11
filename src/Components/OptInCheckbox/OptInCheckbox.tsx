import React, { useEffect, useState } from 'react';

interface OptInCheckboxProps {
  id: string;
  label: string;
  onChange?: (checked: boolean) => void;
}

const OptInCheckbox: React.FC<OptInCheckboxProps> = ({ id, label, onChange }) => {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (onChange) {
      onChange(checked);
    }
  }, [checked, onChange]);

  return (
    <div className="flex items-center space-x-2">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={() => setChecked(!checked)}
        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
      />
      <label htmlFor={id} className="text-sm text-gray-800">
        {label}
      </label>
    </div>
  );
};

export default OptInCheckbox;