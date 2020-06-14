import { Theme, WithStyles, withStyles, createStyles } from "@material-ui/core";

const styles = (theme: Theme) =>
  createStyles({
    simpleHeader: {
      background: "url(/img/experiment-2.jpg)",
      backgroundSize: "cover",
      padding: 10,
      minHeight: 180,
      marginTop: theme.spacing(7),

      [theme.breakpoints.up("sm")]: {
        marginTop: theme.spacing(8),
        minHeight: 180,
      },
    },
    pageHeader: {
      background: "rgba(0,0,0,0.5)",
      padding: 10,
      minHeight: 100,

      [theme.breakpoints.up("sm")]: {
        minHeight: 180,
      },
    },
    headerContainer: {
      marginTop: theme.spacing(7),
      background: "url(/img/experiment-2.jpg)",
      backgroundSize: "cover",
      minHeight: 100,

      [theme.breakpoints.up("sm")]: {
        marginTop: theme.spacing(8),
        minHeight: 180,
      },
    },
  });

export type StyleProps = WithStyles<typeof styles>;
export const style = withStyles(styles);
