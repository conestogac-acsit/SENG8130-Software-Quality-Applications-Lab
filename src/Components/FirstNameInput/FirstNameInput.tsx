
import React, { useId } from 'react';

export interface CustomInputProps {
  label: string;
  name: string;
  placeholder?: string;
  type?: string;
}

const FirstNameInput: React.FC<CustomInputProps> = ({
  label,
  name,
  placeholder = '',
  type = 'text',
}) => {
  const id = useId(); 

  return (
    <div className="flex flex-col mb-4">
      <label htmlFor={id} className="mb-1 text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default FirstNameInput;
