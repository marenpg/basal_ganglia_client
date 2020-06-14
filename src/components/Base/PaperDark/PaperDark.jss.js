import { withStyles, createStyles } from "@material-ui/core";

const styles = theme =>
  createStyles({
    paperDark: {
      backgroundColor: theme.palette.background.secondary,
      boxShadow: "none",
      //border: "1px solid #f8f8f8",
      padding: 16,
      margin: 16
    }
  });

export const style = withStyles(styles);
