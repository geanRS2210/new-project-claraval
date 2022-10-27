import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { useAppSelector } from '../hooks/reduxHooks';

import Login from '../templates/PageLogin';
import App from '../templates/Home';
import { Schedule } from '../templates/PageSchedule';
import { Patient } from '../templates/PageSchedule/Add';
import { OperatorAdd } from '../templates/PageOperator/Add';
import { SpecialtyAdd } from '../templates/PageSpecialty/Add';
import Specialty from '../templates/PageSpecialty';
import Operator from '../templates/PageOperator';

export function RoutesApp(): JSX.Element {
  const auth = useAppSelector((state) => state.auth.loggedin);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="login" element={<Login />} />
          <Route path="agenda" element={auth ? <Schedule /> : <Login />} />
          <Route path="agendar/" element={auth ? <Patient /> : <Login />}>
            <Route path=":param/:id" element={auth ? <Patient /> : <Login />} />
          </Route>
          <Route path="/operadores" element={auth ? <Operator /> : <Login />} />
          <Route
            path="operadores/add/"
            element={auth ? <OperatorAdd /> : <Login />}
          >
            <Route
              path=":param/:id"
              element={auth ? <OperatorAdd /> : <Login />}
            />
          </Route>
          <Route
            path="/especialistas"
            element={auth ? <Specialty /> : <Login />}
          />
          <Route
            path="/especialistas/add/"
            element={auth ? <SpecialtyAdd /> : <Login />}
          >
            <Route
              path=":param/:id"
              element={auth ? <SpecialtyAdd /> : <Login />}
            />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
