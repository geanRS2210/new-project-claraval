import React from 'react';
import { ButtonStyled } from './styles';

interface Props {
  type: 'button' | 'submit' | 'reset' | undefined;
  onChange?: () => void;
  children: string;
}

export function Button({ children, type, onChange }: Props): JSX.Element {
  return (
    <ButtonStyled type={type} onChange={onChange}>
      {children}
    </ButtonStyled>
  );
}
