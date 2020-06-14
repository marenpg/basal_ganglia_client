import React from "react";

import { Box, Container, Typography } from "@material-ui/core";
import { CellsInRegionCountProps } from "./types";

export const CellsInRegionCount: React.FC<CellsInRegionCountProps> = ({ region, cellsIncludingSubRegions }) => {
  const {name, cellsObserved} = region;
  return (
    <Container maxWidth="md">
      <Box mt={2} mb={2} display="flex" justifyContent="center">
        {cellsObserved.length > 0 && (
          <Box pl={2} pr={2}>
            <Typography component="p">
              <Typography component="span" variant="h1">
                {cellsObserved.length}
              </Typography>{" "}
              cell types observed in {name.toLowerCase()}
            </Typography>
          </Box>
        )}
        {cellsIncludingSubRegions.length > cellsObserved.length && (
          <Box pl={2} pr={2}>
            <Typography component="p">
              <Typography component="span" variant="h1">
                {cellsIncludingSubRegions.length}
              </Typography>{" "}
              unique cell types observed in subregions
            </Typography>
          </Box>
        )}
      </Box>
    </Container>
  );
};
