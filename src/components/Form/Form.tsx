import React, { ReactNode } from 'react';

import { FormStyled } from './styles';

interface Children {
  children: ReactNode;
}

export function Form({ children }: Children): JSX.Element {
  return <FormStyled>{children}</FormStyled>;
}
