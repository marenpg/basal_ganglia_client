import {
  createMuiTheme,
  responsiveFontSizes,
  ThemeOptions,
} from "@material-ui/core/styles";

const typographyOptions: ThemeOptions = {
  typography: {
    fontSize: 12,
    h2: {
      fontWeight: 300,
    },
    h3: {
      fontWeight: 300,
    },
    h4: {
      fontWeight: 300,
    },
    h5: {
      fontWeight: 300,
    },
  },
  overrides: {
    MuiTooltip: {
      tooltip: {
        fontSize: 11,
      },
    },
  },
};

const darkTheme = (options: ThemeOptions) =>
  createMuiTheme({
    palette: {
      type: "dark",
      primary: { main: "#F8F8F8", contrastText: "#282828" },
      secondary: { main: "#756A6A", contrastText: "#282828" },
    },
    ...options,
  });

export const customDarkTheme = (options: ThemeOptions) =>
  createMuiTheme({
    palette: {
      text: {
        primary: "#fff",
        secondary: "rgba(255, 255, 255, 0.7)",
        disabled: "rgba(255, 255, 255, 0.5)",
      },
      action: {
        active: "#fff",
        hover: "rgba(255, 255, 255, 0.08)",
        selected: "rgba(255, 255, 255, 0.16)",
        disabled: "rgba(255, 255, 255, 0.3)",
        disabledBackground: "rgba(255, 255, 255, 0.12)",
      },
      background: {
        default: "#303030",
        paper: "#424242",
      },
      divider: "rgba(255, 255, 255, 0.12)",
    },

    ...options,
  });

export default responsiveFontSizes(darkTheme(typographyOptions));
//export default customDarkTheme(typographyOptions);
