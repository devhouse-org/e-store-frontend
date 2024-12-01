import React from "react";

interface CustomInputProps {
  label?: string; // Optional label for the input
  type?: "text" | "email" | "password" | "number"; // Input types
  placeholder?: string; // Placeholder for the input
  value?: string | number; // Current value of the input
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; // Change event handler
  name?: string; // Name attribute for the input
  disabled?: boolean; // Disable the input
  className?: string; // Additional CSS classes for the input
  error?: string; // Error message
  required?: boolean; // Whether the input is required
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
    <div className={`flex flex-col  ${className}`}>
      {label && (
        <label htmlFor={name} className="text-gray-700 font-tajawal-regular">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`px-4 py-2 border rounded-md focus:ring-1 focus:ring-blue-500 focus:outline-none font-tajawal-light  ${
          error ? "border-red-500" : "border-gray-300"
        } ${disabled ? "bg-gray-100 cursor-not-allowed" : ""}`}
        required={required}
      />
      {error && <span className="text-red-500 text-sm ">{error}</span>}
    </div>
  );
};
export default CustomInput;
