import React from "react";

import AnalysesContainer from "../../containers/AnalysesContainer";
import { ExperimentRouteProps } from "./types";
import ExperimentsPage from "./ExperimentsPage";

const ExperimentsRoute: React.FC<ExperimentRouteProps> = ({ classes, match }) => {

  const { filters } = match.params;

  return (
    <AnalysesContainer filters={filters}>
      <ExperimentsPage classes={classes} />
    </AnalysesContainer>
  );
};

export default ExperimentsRoute;

