import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "link";
  active?: boolean;
}

const baseClasses = "rounded px-4 py-2 focus:outline-none";

const variantClasses = {
  primary: "bg-blue-600 text-white hover:bg-blue-700",
  secondary: "bg-gray-300 text-gray-800 hover:bg-gray-400",
  link: "text-blue-600 underline hover:text-blue-800 bg-transparent p-0",
};

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  active = false,
  className = "",
  ...props
}) => {
  const classes = `${baseClasses} ${variantClasses[variant]} ${
    active ? "font-semibold" : ""
  } ${className}`;
  return <button className={classes} {...props} />;
};

export default Button;
