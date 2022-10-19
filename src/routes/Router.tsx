import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

import Login from '../templates/PageLogin';
import App from '../templates/Home';
import { Schedule } from '../templates/PageSchedule';
import { Patient } from '../templates/PageSchedule/Add';
import { OperatorAdd } from '../templates/PageOperator/Add';
import { SpecialtyAdd } from '../templates/PageSpecialty/Add';
import Specialty from '../templates/PageSpecialty';
import Operator from '../templates/PageOperator';

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
          <Route path="/operadores" element={<Operator />} />
          <Route path="operadores/add/" element={<OperatorAdd />}>
            <Route path=":param/:id" element={<OperatorAdd />} />
          </Route>
          <Route path="/especialistas" element={<Specialty />} />
          <Route path="/especialistas/add/" element={<SpecialtyAdd />}>
            <Route path=":param/:id" element={<SpecialtyAdd />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
