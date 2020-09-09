import React from "react";

import { Box, IconButton, Link } from "@material-ui/core";
import { Cancel as CancelIcon } from "@material-ui/icons";

import { BrainRegionRouteProps } from "./types";
import { BrainRegionContainer } from "./BrainRegionContainer";



export const BrainRegionRoute: React.FC<BrainRegionRouteProps> = ({ classes, match }) => {
  const { id, tab } = match.params;

  const tabValue = tab ? parseInt(tab) : undefined;

  return <Box pt={7}>
    <IconButton
      aria-label="Back to all regions"
      title="See all regions"
      color="primary"
      className={classes.closeButton}
      component={Link}
      href={"/brain-regions"}
    >
      <CancelIcon />
    </IconButton>
    <BrainRegionContainer id={id} tab={tabValue} classes={classes} />
  </Box>
};