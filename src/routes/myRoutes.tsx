import React, { ReactElement, ReactNode } from 'react';
import { Route } from 'react-router-dom';
import { useAppSelector } from '../hooks/reduxHooks';
import Login from '../templates/PageLogin';

interface Props {
  children?: ReactNode;
  path: string;
  element: React.ReactElement;
  isClosed?: true;
}

export function MyRouter(props: Props): ReactElement {
  const isLogedIn = useAppSelector((state) => state.auth.loggedin);
  const { children, isClosed, element, path } = props;
  if (isClosed && !isLogedIn) {
    return <Route path="/login" element={<Login />} />;
  }
  return (
    <Route path={path} element={element}>
      {children}
    </Route>
  );
}
