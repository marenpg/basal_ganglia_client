import { Theme, WithStyles, withStyles, createStyles } from "@material-ui/core";

const styles = (theme: Theme) =>
  createStyles({
    pageHeader: {
      background: "rgba(0,0,0,0.5)",
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
    drawerPaper: {
      background: "#252729",
      width: "80%",
    },
    closeButton: {
      position: "absolute",
      zIndex: 1,
      right: 4,
    },
    drawerHeader: {
      paddingTop: 40,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      [theme.breakpoints.down("xs")]: {
        " h1": {
          fontSize: "3rem",
        },
      },
    },
  });

export type StyleProps = WithStyles<typeof styles>;
export const style = withStyles(styles);
