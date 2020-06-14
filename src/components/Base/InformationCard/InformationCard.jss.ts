import { Theme, WithStyles, withStyles, createStyles } from "@material-ui/core";

const styles = (theme: Theme) =>
  createStyles({
    box: {
      marginLeft: 4,
      marginRight: 4,
      marginBottom: 16,
      textAlign: "center",
    },
    boxActionArea: {
      // padding: 10,
    },
  });

export type StyleProps = WithStyles<typeof styles>;
export const style = withStyles(styles);
