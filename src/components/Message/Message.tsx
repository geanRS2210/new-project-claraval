import React, { ReactNode } from 'react';

import { MessageStyled } from './styles';

interface Children {
  children: ReactNode;
}

export function Message({ children }: Children): JSX.Element {
  return <MessageStyled>{children}</MessageStyled>;
}
