import React from 'react';
import { ButtonStyled } from './styles';

interface Props {
  type: 'button' | 'submit' | 'reset' | undefined;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children: string;
  className?: string;
  disabled?: boolean;
}

export function Button({
  children,
  type,
  onClick,
  className,
  disabled,
}: Props): JSX.Element {
  return (
    <ButtonStyled
      type={type}
      onClick={(e) => {
        if (onClick) {
          onClick(e);
        }
      }}
      className={className}
      disabled={disabled}
    >
      {children}
    </ButtonStyled>
  );
}
