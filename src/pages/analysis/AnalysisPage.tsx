import React, { useContext } from "react";
import { IconButton, Link, Typography, Box } from "@material-ui/core";
import { Cancel as CancelIcon } from "@material-ui/icons";

import { AnalysisContext } from "../../providers/contexts";
import { Header } from "../../components/Base/Headers";
import { getAnalysisTitle, getSourceName, getTotalEstimate } from "../../components/Analysis/utils";
import { AnalysisTabs } from "../../components/Analysis/AnalysisTabs";

import { StyleProps, style } from "./AnalysisPage.jss";

const AnalysisPage: React.FC<StyleProps> = ({ classes }) => {
  const { selectedAnalysis, selectedData } = useContext(AnalysisContext);

  if (!selectedAnalysis || !selectedData) return <></>

  const totalEstimate = getTotalEstimate(selectedAnalysis, selectedData);

  return (
    <>
      <IconButton
        aria-label="Back to all analyses"
        title="See all analyses"
        color="primary"
        className={classes.closeButton}
        component={Link}
        href={`/analyses/specie=${selectedAnalysis.specimen?.specie?.id}`}
      >
        <CancelIcon />
      </IconButton>
      <Header
        headerContainerClass={classes.drawerHeaderContainer}
        pageHeaderClass={classes.drawerPageHeader}
        topTitle={getSourceName(selectedAnalysis.experiment?.source?.sourceName)}
        title={getAnalysisTitle(selectedAnalysis, selectedData)}
        subtitle=""
        titleSize="h5"
      >
        <Box mt={totalEstimate && 1} textAlign="center">
          {totalEstimate ? (
            <Typography variant="h5" gutterBottom style={{ fontSize: "0.9rem" }}>
              {totalEstimate}
            </Typography>
          ) : null}
          <Typography variant="subtitle1">
            <Box fontStyle="italic">{selectedAnalysis.specimen?.specie?.name}</Box>
          </Typography>
        </Box>
      </Header>
      <AnalysisTabs />

    </>
  );
};

export default style(AnalysisPage);
