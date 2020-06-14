import { Theme, WithStyles, withStyles, createStyles } from "@material-ui/core";

const styles = (theme: Theme) =>
  createStyles({
    drawerPageHeader: {
      paddingTop: 40,
      minHeight: 120,
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
