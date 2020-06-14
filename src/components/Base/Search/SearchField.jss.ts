import { Theme, WithStyles, withStyles, createStyles } from "@material-ui/core";

const styles = (theme: Theme) =>
  createStyles({
    notchedOutline: {
      borderColor: theme.palette.primary.main
    }
  });

export type StyleProps = WithStyles<typeof styles>;
export const style = withStyles(styles);
