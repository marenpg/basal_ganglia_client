import { Theme, WithStyles, withStyles, createStyles } from "@material-ui/core";

const styles = (theme: Theme) =>
  createStyles({
    scrollBox: {
      [theme.breakpoints.down("sm")]: {
        overflowX: "auto",
      },
    },
    tableRow: {
      "&:hover": {
        backgroundColor: "#756A6A !important",
      },
    },
    tableCell: {
      padding: 0,
    },
    tableLink: {
      display: "block",
      padding: "8px 0 8px 16px",
      fontSize: "0.88rem",
      "&:hover": {
        textDecoration: "none",
      },
      width: "90%",
      textAlign: "left",
    },
    collapseRow: {
      "& > *": {
        borderBottom: "unset",
      },
    },
    iconCell: {
      paddingRight: 0,
      paddingTop: 0,
      paddingBottom: 0,
      maxWidth: 30,
    },
  });

export type StyleProps = WithStyles<typeof styles>;
export const style = withStyles(styles);
