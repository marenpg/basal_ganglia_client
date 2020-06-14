import { Theme, WithStyles, withStyles, createStyles } from "@material-ui/core";

const styles = (theme: Theme) =>
  createStyles({
    header: {
      background: "url(/img/brain-cell-2.jpg)",
      // backgroundSize: "cover",
      padding: 50,
      paddingTop: 90,
      height: 400,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",

      [theme.breakpoints.down("sm")]: {
        height: 200,
      },
      [theme.breakpoints.down("xs")]: {
        height: 100,
        " h1": {
          paddingTop: 100,
          fontSize: "3rem",
        },
      },
    },
    box: {
      width: 300,
      marginLeft: 4,
      marginRight: 4,
      textAlign: "center",
    },
    boxActionArea: {
      // padding: 10,
    },
    boxMedia: {
      backgroundSize: "contain",
      height: 110,
    },
    body: {
      marginTop: -40,
    },
  });

export type StyleProps = WithStyles<typeof styles>;
export const style = withStyles(styles);
