import { createTheme } from '@mui/material';
import { css } from '@emotion/react';
import { buttonClasses } from "@mui/material/Button";


export const theme = createTheme({
  palette: {
    background: {
      default: 'white',
    },
    primary: {
      main: '#F5821F',
      contrastText: 'white',
    },
    action: {
      disabledBackground: '',
      disabled: 'white'
    }
  },
  typography: {
    fontFamily: [
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    h1: {
      fontSize: '2rem',
    },
    h2: {
      fontSize: '1.5rem',
    },
    h3: {
      fontSize: '1rem',
      fontWeight: 'bold',
      lineHeight: '1.5rem',
    },
    h4: {
      fontSize: '1rem',
      lineHeight: '1.5rem',
    },
    h5: {
      fontSize: '0.75rem',
      lineHeight: '1.5rem',
    },
    h6: {
      fontSize: '0.75rem',
      lineHeight: '0.75rem',
    },
  },
  components: {
    MuiButtonBase: {
      styleOverrides: {
        root: {
          [`&.${buttonClasses.disabled}`]: {
            opacity: 0.8
          },
        }
      }
    }
  }
});

export const globalStyles = css`
  * {
    box-sizing: border-box;
  }

  html, body {
    padding: 0;
    margin: 0;
    width: 100%;
    height: 100%;
  }

  body {
    background-color: ${theme.palette.background.default};
  }

  #root {
    height: 100%
  }
`;
