import React from 'react';
import { InputStyled } from './styles';

interface Props {
  type: string;
  onChange?: () => void;
  placeHolder: string;
}

export function Input(props: Props): JSX.Element {
  const { type, onChange, placeHolder } = props;

  return (
    <InputStyled type={type} onChange={onChange} placeholder={placeHolder} />
  );
}
