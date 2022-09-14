import React from 'react';
import ReactDOM from 'react-dom/client';
import { GlobalStyles } from './Styles/GlobalStyles';
import { RoutesApp } from './Router';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <GlobalStyles />
    <RoutesApp />
  </React.StrictMode>,
);
