import { Theme, WithStyles, withStyles, createStyles } from "@material-ui/core";

const styles = (_: Theme) =>(
  createStyles({

  }));

export type StyleProps = WithStyles<typeof styles>;
export const style = withStyles(styles);
