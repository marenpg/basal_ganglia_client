import { createMuiTheme, responsiveFontSizes } from "@material-ui/core";

const theme = createMuiTheme({
  palette: {
    primary: { main: "#F8F8F8" },
    secondary: { main: "#756A6A" },
    // contrast1: { main: "#756A6A"},
    background: {
      primary: "#282828",
      secondary: "#252729",
      secondaryHover: "rgba(255, 255, 255, 0.08)",
      contrast1: "#756A6A"
    },
    text: {
      primary: "rgba(255, 255, 255, 0.9)",
      secondary: "rgba(255, 255, 255, 0.9)",
      disabled: "rgba(255, 255, 255, 0.9)",
      hint: "rgba(255, 255, 255, 0.9)"
    }
  },
  typography: {
    useNextVariants: true,
    fontSize: 12,
    h2: {
      fontWeight: 300
    },
    h3: {
      fontWeight: 300
    },
    h4: {
      fontWeight: 300
    },
    h5: {
      fontWeight: 300
    }
  },
  overrides: {
    MuiTooltip: {
      tooltip: {
        fontSize: 11
      }
    }
  }
});

export default responsiveFontSizes(theme);
