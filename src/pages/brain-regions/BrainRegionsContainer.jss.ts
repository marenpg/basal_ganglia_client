import { Theme, WithStyles, withStyles, createStyles } from "@material-ui/core";

const styles = (theme: Theme) =>
  createStyles({
    simpleHeader: {
      background: theme.palette.secondary.main,
      padding: 10,
      height: 200,
      marginTop: theme.spacing(7),

      [theme.breakpoints.up("sm")]: {
        marginTop: theme.spacing(8),
        minHeight: 180,
      },
    },
    pageHeader: {
      background: "rgba(0,0,0,0.8)",
      padding: 10,
      minHeight: 100,

      [theme.breakpoints.up("sm")]: {
        minHeight: 180,
      },
    },
    headerContainer: {
      marginTop: theme.spacing(7),
      background: "url(/img/brain.jpg)",
      minHeight: 100,

      [theme.breakpoints.up("sm")]: {
        marginTop: theme.spacing(8),
        minHeight: 180,
      },
    },
    specieTreeContainer: {
      [theme.breakpoints.down("xs")]: {
        flexDirection: "column",
        alignItems: "center",
      },
    },
  });

export type StyleProps = WithStyles<typeof styles>;
export const style = withStyles(styles);
