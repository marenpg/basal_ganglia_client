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
      padding: 20,
      minHeight: 140,
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
  });

  export type StyleProps = WithStyles<typeof styles>;
  export const style = withStyles(styles);
  