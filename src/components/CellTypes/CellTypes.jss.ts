import { Theme, WithStyles, withStyles, createStyles } from "@material-ui/core";

const styles = (theme: Theme) =>
  createStyles({
    pageHeader: {
      background: "rgba(0,0,0,0.5)",
      padding: 10,
      minHeight: 100,

      [theme.breakpoints.up("sm")]: {
        minHeight: 180
      },
    },
    headerContainer: {
      marginTop: theme.spacing(7),
      background: "url(/img/brain-cell-2.jpg)",
      minHeight: 100,

      [theme.breakpoints.up("sm")]: {
        marginTop: theme.spacing(8),
        minHeight: 180
      },
    },
    drawerPaper: {
      background: theme.palette.background.paper,
      width: "80%"
    },
    closeButton: {
      position: "absolute",
      zIndex: 1,
      right: 4
    }
  });

  export type StyleProps = WithStyles<typeof styles>;
  export const style = withStyles(styles);
  