import React, { ReactNode } from 'react';

import { ListStyled } from './styles';

interface Children {
  children: ReactNode;
}

export function List({ children }: Children): JSX.Element {
  return <ListStyled>{children}</ListStyled>;
}
