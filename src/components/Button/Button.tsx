import React from 'react';
import { ButtonStyled } from './styles';

interface Props {
  type: 'button' | 'submit' | 'reset' | undefined;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children: string;
}

export function Button({ children, type, onClick }: Props): JSX.Element {
  return (
    <ButtonStyled
      type={type}
      onClick={(e) => {
        if (onClick) {
          onClick(e);
        }
      }}
    >
      {children}
    </ButtonStyled>
  );
}
