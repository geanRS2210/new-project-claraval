import React from 'react';
import { Link } from 'react-router-dom';

import { HeaderStyled } from './styles';

export function Header(): JSX.Element {
  return (
    <HeaderStyled>
      <Link to="/agendar" className="add-link">
        <button type="button" className="add">
          {' '}
          +{' '}
        </button>
      </Link>
      <Link to="/login">
        <button type="button"> Login </button>
      </Link>
      <Link to="/agenda">
        <button type="button"> Agenda </button>
      </Link>
      <Link to="/especialistas">
        <button type="button"> Especialistas </button>
      </Link>
      <Link to="/operadores">
        <button type="button"> Operadores </button>
      </Link>
    </HeaderStyled>
  );
}
