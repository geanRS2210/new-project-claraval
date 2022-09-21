import React from 'react';
import ReactDOM from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import { RoutesApp } from './Router';
import { GlobalStyles } from './Styles/GlobalStyles';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <GlobalStyles />
    <ToastContainer
      position="top-left"
      className="toastify"
      icon={false}
      autoClose={3000}
    />
    <RoutesApp />
  </React.StrictMode>,
);
