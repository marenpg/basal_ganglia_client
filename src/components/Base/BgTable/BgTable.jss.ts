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
      padding: "6px 24px 6px 16px",
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
  });

export type StyleProps = WithStyles<typeof styles>;
export const style = withStyles(styles);
