import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router';
import { staticRoutes } from './routes/routes';
import { StoreProvider } from './context/StoreProvider';
import './assets/styles/reset.css';
import './assets/styles/style.css';
import { Cards } from './components/cards/Cards';
import { Form } from './components/form/Form';
import { Pay } from './components/pay/Pay';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <StoreProvider>
      <BrowserRouter>
        <Routes>
          <Route path={staticRoutes.base} element={<Cards />} />
          <Route path={staticRoutes.contact} element={<Form />} />
          <Route path={staticRoutes.pay} element={<Pay />} />
        </Routes>
      </BrowserRouter>
    </StoreProvider>
  </React.StrictMode>
);
