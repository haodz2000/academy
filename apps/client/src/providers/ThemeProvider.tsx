import { FC, PropsWithChildren, useMemo } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';

export const AppThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  const appTheme = useMemo(() => {
    return createTheme({
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
        text: {
          primary: '#FFF',
          secondary: '#000',
        },
      },
    });
  }, []);

  return <ThemeProvider theme={appTheme}>{children}</ThemeProvider>;
};
