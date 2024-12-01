import React from 'react';
import { FieldValidation } from '../../utils/validation';

interface FormFieldProps {
  label: string;
  validation?: FieldValidation;
  error?: string;
  children: React.ReactNode;
  isDark: boolean;
}

const FormField = ({ label, validation, error, children, isDark }: FormFieldProps) => {
  const labelClasses = `block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-1`;

  return (
    <div>
      <label className={labelClasses}>
        {label}
        {validation?.required && (
          <span className="text-red-500 ml-1">*</span>
        )}
      </label>
      {children}
      {error && (
        <p className="mt-1 text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}

export default FormField;