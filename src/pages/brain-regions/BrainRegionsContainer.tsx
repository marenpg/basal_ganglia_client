import React from "react";

import LoadingPage from "../../components/Base/LoadingPage";
import ErrorPage from "../../components/Base/ErrorPage";

import { StyleProps } from "./BrainRegionsContainer.jss";
import { BrainRegionsDataContext } from "../../providers/contexts";
import { BrainRegion } from "../../utils/api/types";
import useBrainRegionsHooks from "../../hooks/useBrainRegionsHooks";
import { BrainRegionIdAndSpecieData } from "../brain-region/types";

import BrainRegionsPage from "./BrainRegionsPage";

export const BrainRegionsRoute: React.FC<StyleProps> = ({ classes }) => {
  const { loading, data, error } = useBrainRegionsHooks<BrainRegionIdAndSpecieData>();

  if (loading && !error) {
    return <LoadingPage classes={classes} title="Brain regions" subtitle="" />;
  }

  if (error || (!loading && !data)) {
    return <ErrorPage
      classes={classes}
      title="Brain regions"
      subtitle=""
      message="Oups, an error occurred while fetching brain regions" />
  }

  let allRegions: BrainRegion[] = [];
  if (data) {
    // filter out regions not in tree
    allRegions = data.BrainRegion.filter(r => r.partOf || r.name === "Brain");
    data.BrainRegion = allRegions;

    return (
      <BrainRegionsDataContext.Provider value={data}>
        <BrainRegionsPage classes={classes} />
      </BrainRegionsDataContext.Provider>
    );
  }

  return <ErrorPage
    classes={classes}
    title="Brain regions"
    subtitle=""
    message="No brain regions exist" />

};