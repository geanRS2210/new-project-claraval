import React from 'react';
import { InputStyled } from './styles';

interface Props {
  type: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeHolder?: string;
  value: string | number;
  className?: string;
  disabled?: boolean;
  name?: string;
  pattern?: string;
  min?: string;
}

export function Input(props: Props): JSX.Element {
  const {
    type,
    onChange,
    placeHolder,
    value,
    className,
    disabled,
    name,
    pattern,
    min,
  } = props;

  return (
    <InputStyled
      value={value}
      type={type}
      onChange={(e) => {
        if (onChange) {
          onChange(e);
        }
      }}
      placeholder={placeHolder}
      className={className}
      disabled={disabled}
      name={name}
      pattern={pattern}
      min={min}
    />
  );
}
