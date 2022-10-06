import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { RoutesApp } from './Router';
import { GlobalStyles } from './Styles/GlobalStyles';
import { store } from '../src/store/index';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <GlobalStyles />
      <ToastContainer
        position="top-right"
        className="toast-container"
        icon={false}
        autoClose={3000}
      />
      <RoutesApp />
    </Provider>
  </React.StrictMode>,
);
