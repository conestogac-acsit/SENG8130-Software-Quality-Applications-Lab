import React, { useEffect, useState } from "react";

interface ButtonLabelProps {
  label: string;
  onClick?: () => void;
}

const ButtonLabel: React.FC<ButtonLabelProps> = ({ label, onClick }) => {
  const [displayLabel, setDisplayLabel] = useState<string>("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDisplayLabel(label);
    }, 300);

    return () => clearTimeout(timer);
  }, [label]);

  return (
    <button
      onClick={onClick}
      className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition-colors duration-300"
      aria-label={label}
    >
      {displayLabel || "Loading..."}
    </button>
  );
};

export default ButtonLabel;
