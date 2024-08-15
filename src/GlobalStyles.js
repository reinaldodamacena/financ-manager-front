// src/GlobalStyles.js
import { GlobalStyles } from '@mui/system';

const GlobalStylesComponent = () => (
  <GlobalStyles
    styles={(theme) => ({
      '*': {
        boxSizing: 'border-box',
        margin: 0,
        padding: 0,
        fontFamily: theme.typography.fontFamily,
      },
      html: {
        height: '100%',
        width: '100%',
      },
      body: {
        height: '100%',
        width: '100%',
        overflowX: 'hidden',
        backgroundColor: theme.palette.background.default,
      },
      '#root': {
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      },
      'input, button, select, textarea': {
        fontFamily: 'inherit',
        fontSize: 'inherit',
        lineHeight: 'inherit',
      },
      '.container': {
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: theme.spacing(2),
        overflowY: 'auto',
      },
      '@media (max-width: 768px)': {
        '.container': {
          padding: theme.spacing(1.5),
        },
      },
      '@media (max-width: 480px)': {
        '.container': {
          padding: theme.spacing(1),
        },
      },
    })}
  />
);

export default GlobalStylesComponent;
