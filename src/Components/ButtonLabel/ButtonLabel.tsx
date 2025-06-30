import React, { useEffect } from "react";

interface ButtonLabelProps {
  label: string;
  onClick?: () => void;
}

const ButtonLabel: React.FC<ButtonLabelProps> = ({ label, onClick }) => {
  useEffect(() => {
    // no loading logic here at all
  }, []);

  return (
    <button
      onClick={onClick}
      className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
      type="button"
    >
      {label}
    </button>
  );
};

export default ButtonLabel;
