import  { memo } from 'react';
import type { FormFieldProps } from '../types/formTypes';



const FormField = ({ label, name, type, value, onChange }: FormFieldProps) => {
  console.log(`Rendering Field: ${name}`);

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="text-sm font-medium text-gray-600">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 bg-gray-50 hover:bg-white"
      />
    </div>
  );
};

export default memo(FormField);