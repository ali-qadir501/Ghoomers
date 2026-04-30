import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { CurrencyProvider } from './context/CurrencyContext';
import { AppProvider } from './context/AppContext';
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AppProvider>
        <CurrencyProvider>
          <App />
        </CurrencyProvider>
      </AppProvider>
    </BrowserRouter>
  </StrictMode>,
);
