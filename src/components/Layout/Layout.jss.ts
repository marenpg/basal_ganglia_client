import { Theme, WithStyles, withStyles, createStyles } from "@material-ui/core";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      display: "flex"
    },
    toolbar: {
      paddingRight: 24
    },
    toolbarIcon: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      padding: "0 8px",
      ...theme.mixins.toolbar
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      backgroundColor: theme.palette.background.default
    },
    appBarShift: {
      width: "100%",
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      })
    },
    menuButton: {
      marginLeft: 12,
      marginRight: 36
    },
    menuButtonHidden: {
      display: "none"
    },
    title: {
      flexGrow: 1
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      height: "100vh",
      overflow: "auto",
      background: theme.palette.background.default,
      color: theme.palette.text.primary
    },
    drawerPaper: {
      position: "relative",
      whiteSpace: "nowrap",
      width: 240,
      background: theme.palette.background.paper,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      })
    },
    drawerTitleContainer: {
      margin: "24px 0"
    },
    drawerListItem: {
      "&:hover": {
        backgroundColor: theme.palette.action.hover
      }
    },
    drawerListItemActive: {
      background: theme.palette.action.hover
    },
    divider: {
      background: "rgba(255,255,255,0.12)"
    },
    icon: {
      color: theme.palette.text.primary
    }
  });

  export type StyleProps = WithStyles<typeof styles>;
  export const style = withStyles(styles);