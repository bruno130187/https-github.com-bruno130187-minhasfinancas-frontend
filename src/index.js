import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './main/App';
import AuthProvider from './main/ProvedorAutenticacaoContext';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
