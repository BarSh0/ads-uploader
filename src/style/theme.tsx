import { createTheme } from '@mui/material/styles';

// Create a custom theme using createTheme function
const theme = createTheme({
  palette: {
    primary: {
      main: '#1f263e',
    },
    secondary: {
      main: '#3f51b5',
    },
  },
  typography: {
    fontFamily: 'Arial, sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '.5rem',
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: '1rem',
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          boxShadow: 'rgba(0, 0, 0, 0.1) 0px 0px 0px 1px',
          padding: '6px',
          '&:hover': {
            backgroundColor: '#b5c2ca',
          },
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          minWidth: '8rem',
          marginTop: '0.5rem',
          borderRadius: '1rem',
          boxShadow: 'rgba(0, 0, 0, 0.1) 0px 0px 0px 1px',
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: 'inherit',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: '.5rem',
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        root: {
          borderRadius: '1rem',
        },
        paper: {
          borderRadius: '.5rem',
        },
        popupIndicator: {
          marginLeft: '0.5rem',
        },
      },
    },
  },
});

export default theme;
