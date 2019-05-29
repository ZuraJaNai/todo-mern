import { createMuiTheme } from "@material-ui/core/styles";

export default createMuiTheme({
  typography: {
    useNextVariants: true,
    fontFamily: [
      "Baloo Chettan",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
  palette: {
    primary: {
      main: "#3F8080",
      dark: "#3F8080",
      light: "#9BC2C2",
    },
    secondary: {
      main: "#000",
      black: "#000",
      white: "#fff",
      error: "red",
    },
  },
  overrides: {
    MuiInput: {
      underline: {
        "&:after": {
          borderBottomColor: "#3F8080",
        },
      },
    },
  },
});
