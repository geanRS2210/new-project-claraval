import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Header } from './components/Header/Header';
import Login from './templates/PageLogin';

import App from './templates/pagePrincipal';

export function RoutesApp(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
