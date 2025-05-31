import React from "react";

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const TextInput: React.FC<TextInputProps> = ({ className = "", ...props }) => {
  return (
    <input
      type="text"
      className={`border rounded px-2 py-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
      {...props}
    />
  );
};

export default TextInput;
