import React from 'react';
import { HeadingStyled } from './styles';

interface Children {
  children: string;
  className?: string;
}

export function Heading({ children, className }: Children): JSX.Element {
  return <HeadingStyled className={className}>{children}</HeadingStyled>;
}
