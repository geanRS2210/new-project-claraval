import React from 'react';
import { FaSignOutAlt, FaSignInAlt, FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks/reduxHooks';

import { HeaderStyled } from './styles';

export function Header(): JSX.Element {
  const level = useAppSelector((state) => state.auth.level);
  const auth = useAppSelector((state) => state.auth.loggedin);

  return (
    <HeaderStyled>
      <Link to="/agendar">
        <FaPlus className="login-logedout" />
      </Link>
      <Link to="/agenda" className="links">
        Agenda
      </Link>
      {level === 'administrator' ? (
        <>
          <Link to="/especialistas" className="links">
            Especialistas
          </Link>
          <Link to="/operadores" className="links">
            Operadores
          </Link>
        </>
      ) : null}
      {auth ? (
        <Link to="/login" className="login-logedout">
          <FaSignOutAlt />
        </Link>
      ) : (
        <Link to="/login" className="login-logedout">
          <FaSignInAlt />
        </Link>
      )}
    </HeaderStyled>
  );
}
