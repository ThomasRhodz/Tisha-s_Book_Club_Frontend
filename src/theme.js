import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: '#61B1C1',
    },
    secondary: {
      main: '#2fd09a',
    },
    error: {
      main: red.A400,
    },
    background: {
      //default: "#a2b897"
      default: "#0e2336"
    }
  },
});

export default theme;