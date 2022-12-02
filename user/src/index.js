import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

// apis
import { AxiosInterceptor } from './apis/axiosInstance';
// contexts
import { AuthProvider } from './contexts/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <HelmetProvider>
    <BrowserRouter>
      <AuthProvider>
        <AxiosInterceptor />
        <App />
      </AuthProvider>
    </BrowserRouter>
  </HelmetProvider>
);
