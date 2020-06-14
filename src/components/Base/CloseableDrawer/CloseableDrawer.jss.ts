import { Theme, WithStyles, withStyles, createStyles } from "@material-ui/core";

const styles = (theme: Theme) =>
  createStyles({
    drawerPaper: {
      background: theme.palette.background.paper,
      width: "80%",
    },
    closeButton: {
      position: "absolute",
      zIndex: 1,
      right: 4,
    },
    fullscreenLink: {
      position: "absolute",
      zIndex: 1,
      right: 45,
    },
  });

export type StyleProps = WithStyles<typeof styles>;
export const style = withStyles(styles);
