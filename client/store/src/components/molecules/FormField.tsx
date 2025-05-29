import React from "react";
import Text from "../atoms/Text";
import Input from "../atoms/Input";

interface FormFieldProps {
  label: string;
  error?: string;
  children?: React.ReactNode;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
}

const FormField = ({ label, error, children, inputProps }: FormFieldProps) => {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-400">{label}</label>
      {children ? children : <Input {...inputProps} />}
      {error && <Text size="sm" className="text-red-500">{error}</Text>}
    </div>
  );
};

export default FormField;
