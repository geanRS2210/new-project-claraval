import React, { ReactNode } from 'react';

import { CheckStyled } from './styles';

interface Children {
  children: ReactNode;
  check: boolean;
}

export function Check({ children, check }: Children): JSX.Element {
  return <CheckStyled>{check ? children : null}</CheckStyled>;
}
