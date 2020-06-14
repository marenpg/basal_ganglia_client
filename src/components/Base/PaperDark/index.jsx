import React from "react";
import { Paper } from "@material-ui/core";

import { style } from "./PaperDark.jss";

const PaperDark = ({
  classes,
  children,
  elevation = 1,
  square = false,
  variant = "elevation",
  component = "div"
}) => (
  <Paper
    className={classes.paperDark}
    elevation={elevation}
    square={square}
    variant={variant}
    component={component}
  >
    {children}
  </Paper>
);

export default style(PaperDark);
