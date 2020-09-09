import React from "react";
import { Box, Typography } from "@material-ui/core";
import { SimpleHeaderProps } from "./types";

export const SimpleHeader: React.FC<SimpleHeaderProps> = ({ classes, title, subtitle }) => (
  <Box
    className={classes.simpleHeader}
    display="flex"
    alignItems="center"
    justifyContent="center"
    flexDirection="column"
  >
    {title ? (
      <Typography component="h1" variant="h2" color="inherit">
        {title}
      </Typography>
    ) : null}
    {subtitle ? (
      <Typography component="p" variant="subtitle1" color="inherit">
        {subtitle}
      </Typography>
    ) : null}
  </Box>
);

