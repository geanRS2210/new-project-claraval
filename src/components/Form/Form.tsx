import React, { ReactNode } from 'react';

import { FormStyled } from './styles';

interface Children {
  children: ReactNode;
  className?: string;
}

export function Form(props: Children): JSX.Element {
  const { children, className } = props;
  return <FormStyled className={className}>{children}</FormStyled>;
}
