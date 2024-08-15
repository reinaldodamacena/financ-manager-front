import React from 'react';
import ReactDOM from 'react-dom/client'; // Atualizado para usar createRoot
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import App from './components/App';
import theme from './theme';
import { UserProvider } from './context/userContext';
import GlobalStyles from './GlobalStyles';
import { UserFormProvider } from './context/UserFormContext';

const root = ReactDOM.createRoot(document.getElementById('root')); // Cria uma raiz no DOM
root.render(
  <React.StrictMode>
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <UserProvider>
      <UserFormProvider>
        <GlobalStyles />
        <App />
      </UserFormProvider>
    </UserProvider>
  </ThemeProvider>
</React.StrictMode>
);
