import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Login from './templates/PageLogin';

import App from './templates/pagePrincipal';

export function RoutesApp(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path=":id" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
