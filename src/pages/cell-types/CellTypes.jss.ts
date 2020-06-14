import { Theme, WithStyles, withStyles, createStyles } from "@material-ui/core";

const styles = (theme: Theme) =>
  createStyles({
    simpleHeader: {
      background: "url(/img/brain-cell-2.jpg)",
      padding: 10,
      height: 200,
      marginTop: theme.spacing(7),

      [theme.breakpoints.up("sm")]: {
        marginTop: theme.spacing(8),
        minHeight: 200
      },
    },
  });

export type StyleProps = WithStyles<typeof styles>;
export const style = withStyles(styles);
