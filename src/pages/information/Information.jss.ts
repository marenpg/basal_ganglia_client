import { Theme, WithStyles, withStyles, createStyles } from "@material-ui/core";

const styles = (theme: Theme) =>
  createStyles({
    drawerPageHeader: {
      paddingTop: 50,
      minHeight: 220,
      [theme.breakpoints.down("xs")]: {
        " h1": {
          fontSize: "3rem",
        },
      },
    },
    drawerHeaderContainer: {
      background: theme.palette.secondary.main,
      minHeight: 240,
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
