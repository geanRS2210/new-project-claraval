import React, { ReactNode } from 'react';
import { Link, Outlet } from 'react-router-dom';

import { HeaderStyled } from './styles';

export function Header(): JSX.Element {
  return (
    <HeaderStyled>
      <Link to="/">Home</Link>
      <Link to="/login">Login</Link>
      <Link to="/agenda">Para Agendar</Link>
      <Link to="/especialistas">Especialistas</Link>
      <Link to="/operadores">Operadores</Link>
    </HeaderStyled>
  );
}
