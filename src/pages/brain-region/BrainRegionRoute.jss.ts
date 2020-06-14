import { Theme, WithStyles, withStyles, createStyles } from "@material-ui/core";

const styles = (theme: Theme) =>
  createStyles({
    simpleHeader: {
      background: "url(/img/brain.jpg)",
      padding: 50,
      paddingTop: 90,
      height: 200,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",

      [theme.breakpoints.down("sm")]: {
        height: 200,
      },
      [theme.breakpoints.down("xs")]: {
        height: 200,
      },
      " h1.MuiTypography-h1": {
        [theme.breakpoints.down("xs")]: {
          fontSize: "2.1rem",
        },
      },
    },
    pageHeader: {
      background: "rgba(0,0,0,0.8)",
      padding: 10,
      minHeight: 100,
    },
    headerContainer: {
      marginTop: theme.spacing(7),
      background: "url(/img/brain-cell-2.jpg)",
      minHeight: 100,

      [theme.breakpoints.up("sm")]: {
        marginTop: theme.spacing(8),
      },
    },

    drawerPageHeader: {
      paddingTop: 40,
      [theme.breakpoints.down("xs")]: {
        " h1": {
          fontSize: "3rem",
        },
      },
    },
    drawerHeaderContainer: {
      background: theme.palette.secondary.main,
      minHeight: 180,
    },
    closeButton: {
      position: "absolute",
      zIndex: 1,
      right: 16,
      top: 64,
    },
  });

export type StyleProps = WithStyles<typeof styles>;
export const style = withStyles(styles);
