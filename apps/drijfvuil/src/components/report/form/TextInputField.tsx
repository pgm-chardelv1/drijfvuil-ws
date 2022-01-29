import React, { ReactElement, useState } from 'react';

interface TextInputFieldProps {
  name: string;
  placeholder?: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

export default function TextInputField({
  name,
  value,
  onChange,
  onBlur,
  placeholder = '',
}: TextInputFieldProps): ReactElement {
  const [currentValue, setCurrentValue] = useState(value);

  return (
    <input
      type="text"
      name={name}
      placeholder={placeholder}
      value={currentValue}
      onChange={(e) => {
        if (onChange) onChange(e);
        setCurrentValue(e.currentTarget.value);
      }}
      onBlur={onBlur}
    />
  );
}
