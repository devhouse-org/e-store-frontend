import * as React from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface CustomInputProps {
  label?: string;
  type?: "text" | "email" | "password" | "number";
  placeholder?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  disabled?: boolean;
  className?: string;
  error?: string;
  required?: boolean;
}

const CustomInput: React.FC<CustomInputProps> = ({
  label,
  type = "text",
  placeholder = "",
  value,
  onChange,
  name,
  disabled = false,
  className = "",
  error,
  required = false,
}) => {
  return (
    <div className={`flex flex-col space-y-2 ${className}`}>
      {label && (
        <label
          htmlFor={name}
          className="text-sm font-tajawal-medium text-gray-700 dark:text-gray-100"
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="relative">
        <Input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={cn(
            "text-base font-tajawal-medium",
            error
              ? "border-red-500 placeholder:text-right text-right focus:ring-red-500"
              : "border-input",
            disabled ? "cursor-not-allowed opacity-50" : "",
            "px-3 py-2 rounded-md focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-blue-500"
          )}
          required={required}
        />
        {error && (
          <span className="absolute text-sm text-red-500 bottom-0 left-0">
            {error}
          </span>
        )}
      </div>
    </div>
  );
};

export default CustomInput;
