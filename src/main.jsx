import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';

const root = document.getElementById('root');

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    {/* Añadimos los future flags para evitar los warnings de v7 */}
    <BrowserRouter 
      future={{ 
        v7_startTransition: true, 
        v7_relativeSplatPath: true 
      }}
    >
      <App />
    </BrowserRouter>
  </React.StrictMode>
);