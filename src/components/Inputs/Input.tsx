import React from 'react';
import { InputStyled } from './styles';

interface Props {
  type: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeHolder?: string;
  value: string | number;
}

export function Input(props: Props): JSX.Element {
  const { type, onChange, placeHolder, value } = props;

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
    />
  );
}
