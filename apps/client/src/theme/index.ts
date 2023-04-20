import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';
// import '@fontsource/cabin/400.css';
// import '@fontsource/cabin/500.css';
// import '@fontsource/cabin/600.css';
// import '@fontsource/cabin/700.css';

// Create a index instance.
const index = createTheme({
  typography: {
    fontFamily: [
      'Cabin',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
  },
});

export default index;
