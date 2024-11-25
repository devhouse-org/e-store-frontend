import React from "react";
import { IconType } from "react-icons";

interface ButtonProps {
  label?: string;
  action?: () => void;
  Icon?: IconType;
  variation: "outline" | "fill" | "ghost";
  isLoading?: boolean;
  color?: "green" | "red" | "orange";
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  label,
  action,
  Icon,
  variation,
  isLoading = false,
  color = "orange",
  disabled = false,
}) => {
  const baseStyles =
    "px-4 py-2 rounded-md flex items-center justify-center gap-2 transition";
  const colorStyles = {
    green: {
      fill: "bg-green-500 text-white hover:bg-green-600",
      outline:
        "border-2 border-green-500 text-green-500 hover:bg-green-500 hover:text-white",
      ghost: "bg-transparent text-green-500 hover:bg-green-100",
    },
    red: {
      fill: "bg-red-500 text-white hover:bg-red-600",
      outline:
        "border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white",
      ghost: "bg-transparent text-red-500 hover:bg-red-100",
    },
    orange: {
      fill: "bg-orange-500 text-white hover:bg-orange-600",
      outline:
        "border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white",
      ghost: "bg-transparent text-orange-500 hover:bg-orange-100",
    },
  };

  const loadingStyles = "opacity-50 cursor-not-allowed";
  const disabledStyles = "opacity-50 cursor-not-allowed";

  return (
    <button
      onClick={action}
      disabled={isLoading || disabled}
      className={`${baseStyles} ${colorStyles[color][variation]} ${
        isLoading && loadingStyles
      } ${isLoading || disabled ? disabledStyles : ""}`}
    >
      {isLoading ? (
        <span className="loader" />
      ) : (
        Icon && <Icon className="text-lg" />
      )}
      {label && !isLoading && <span>{label}</span>}
    </button>
  );
};

export default Button;
