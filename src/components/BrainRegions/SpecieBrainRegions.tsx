import React, { useState, useEffect } from "react";
import { Box, Typography } from "@material-ui/core";

import { BrainRegionTree } from "./BrainRegionTree";
import { SpecieBrainRegionsProps } from "./types";
import { BrainRegion } from "../../utils/api/types";
import { getParentsOfElements } from "../../utils/treeMapper";
import { getElementsMatchingFilter } from "../../utils";

export const SpecieBrainRegions: React.FC<SpecieBrainRegionsProps> = ({ title, regions, filter, handleRegionSelected }) => {
  const [filteredRegions, setFilteredRegions] = useState<BrainRegion[]>(regions);

  useEffect(() => {
    setFilteredRegions(getFilteredRegions(filter, regions));
  }, [regions, filter]);

  const getFilteredRegions = (filter: string, regions: BrainRegion[]) => {
    if (!filter) {
      return regions;
    }
    const matchingRegions = getElementsMatchingFilter(filter, "name", regions);
    const matchingRegionsWithParents = getParentsOfElements(matchingRegions, regions, "partOf");
    return matchingRegionsWithParents;
  };

  return (
    <Box display="flex" flexDirection="column" mb={3}>
      <Typography component="h2" variant="h5">
        {title}
      </Typography>
      {filteredRegions.length > 0 ?
        (
          <BrainRegionTree
            regions={filteredRegions}
            handleRegionSelected={handleRegionSelected}
          />
        ) : (
          <Box fontStyle="italic" mt={1}>
            <Typography component="p" variant="subtitle1">
              No regions matching search.
      </Typography>
          </Box>
        )}
    </Box>
  );
};
