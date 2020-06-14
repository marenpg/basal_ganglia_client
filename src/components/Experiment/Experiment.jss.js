import { withStyles, createStyles } from "@material-ui/core";

const styles = theme =>
  createStyles({
    header: {
      background: "url(/img/experiment-2.jpg)",
      backgroundSize: "cover",
      padding: 50,
      paddingTop: 90,
      height: 300,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",

      [theme.breakpoints.down("sm")]: {
        height: 200
      },
      [theme.breakpoints.down("xs")]: {
        height: 100,
        " h1": {
          paddingTop: 100,
          fontSize: "3rem"
        }
      }
    }
  });

export const style = withStyles(styles);
