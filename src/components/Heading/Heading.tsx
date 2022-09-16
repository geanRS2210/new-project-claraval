import React from 'react';
import { HeadingStyled } from './styles';

interface Children {
  children: string;
}

export function Heading({ children }: Children): JSX.Element {
  return <HeadingStyled>{children}</HeadingStyled>;
}
