import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import App from './components/App';
import theme from './theme';
import GlobalStyles from './GlobalStyles';
import AppProviders from './appProviders'; // Importa o AppProviders

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AppProviders>
          <GlobalStyles />
          <App />
        </AppProviders>
      </Router>
    </ThemeProvider>
  </React.StrictMode>
);
