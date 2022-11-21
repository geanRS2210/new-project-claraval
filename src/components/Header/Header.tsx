import React from 'react';
import { FaSignOutAlt, FaSignInAlt, FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks/reduxHooks';
import { authReverse } from '../../templates/PageLogin/authSlice';

import { HeaderStyled } from './styles';

export function Header(): JSX.Element {
  const dispatch = useAppDispatch();
  const level = useAppSelector((state) => state.auth.level);
  const auth = useAppSelector((state) => state.auth.loggedin);
  console.log(level);

  return (
    <HeaderStyled>
      <Link to="/agendar">
        <FaPlus className="login-logedin" />
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
        <Link
          to="/"
          className="login-logedout"
          onClick={() => dispatch(authReverse())}
        >
          <FaSignOutAlt />
        </Link>
      ) : (
        <Link to="/login" className="login-logedin">
          <FaSignInAlt />
        </Link>
      )}
    </HeaderStyled>
  );
}
