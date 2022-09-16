import React, { ReactNode } from 'react';

import { ContainerStyled } from './styles';

interface Props {
  className: string;
  children: ReactNode;
}

export function Container({ children, className }: Props): JSX.Element {
  return <ContainerStyled className={className}>{children}</ContainerStyled>;
}
