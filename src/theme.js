
import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";

let theme = createMuiTheme({
  palette: {
    primary: {
      main: "#00ccff",
    },
    secondary: {
      light: "#FF7900",
      main: "#ccf5ff",
      dark: "#dc004e",
    },
  },
  typography: {
    fontFamily: ["Montserrat", "sans-serif"].join(","),
  },
  overrides: {
   
  },
});

theme = responsiveFontSizes(theme);

export default theme;