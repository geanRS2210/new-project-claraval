import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

import Login from '../templates/PageLogin';
import App from '../templates/pagePrincipal';
import { Schedule } from '../templates/Schedule/Schedule';
import { Patient } from '../templates/AddPatient/Patient';

export function RoutesApp(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="login" element={<Login />} />
          <Route path="agenda" element={<Schedule />} />
          <Route path="agendar/" element={<Patient />}>
            <Route path=":param/:id" element={<Patient />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
