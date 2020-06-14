import { withStyles, createStyles } from "@material-ui/core";

const styles = theme =>
  createStyles({
    tableRow: {
      borderTop: "1px solid rgba(224, 224, 224, 1)"
    },
    scrollBox: {
      [theme.breakpoints.down("xs")]: {
        overflowX: "scroll"
      }
    }
  });

export const style = withStyles(styles);
