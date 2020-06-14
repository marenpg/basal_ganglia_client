import { Theme, WithStyles, withStyles, createStyles } from "@material-ui/core";

const styles = (theme: Theme) =>
  createStyles({
    simpleHeader: {
      background: "url(/img/brain-cell-2.jpg)",
      padding: 50,
      paddingTop: 90,
      height: 200,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",

      [theme.breakpoints.down("sm")]: {
        height: 200,
      },
      [theme.breakpoints.down("xs")]: {
        height: 200,
      },
      " h1.MuiTypography-h1": {
        [theme.breakpoints.down("xs")]: {
          fontSize: "2.1rem",
        },
      },
    }
  });

export type StyleProps = WithStyles<typeof styles>;
export const style = withStyles(styles);