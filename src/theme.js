
import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";

let theme = createMuiTheme({
  palette: {
    primary: {
      main: "#00ccff",
    },
    secondary: {
      light: "#8041ec",
      main: "#ccf5ff",
      dark: "#673ab7",
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