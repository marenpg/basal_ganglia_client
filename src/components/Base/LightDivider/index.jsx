import React from "react";
import { withStyles, createStyles } from "@material-ui/core";
import { Divider } from "@material-ui/core";

const styles = () =>
  createStyles({
    lightDivider: {
      background: "rgba(255,255,255,0.12)"
    }
  });

const style = withStyles(styles);

const LightDivider = ({ classes }) => (
  <Divider className={classes.lightDivider} />
);

export default style(LightDivider);
