import React, { useContext } from "react";
import { IconButton, Link } from "@material-ui/core";
import { Cancel as CancelIcon } from "@material-ui/icons";

import { AnalysisContext } from "../../providers/contexts";
import { Header } from "../../components/Base/Headers";
import { getAnalysisTitle } from "../../components/Analysis/utils";
import { AnalysisTabs } from "../../components/Analysis/AnalysisTabs";

import { StyleProps, style } from "./AnalysisPage.jss";

const AnalysisPage: React.FC<StyleProps> = ({ classes }) => {
  const { selectedAnalysis, selectedData } = useContext(AnalysisContext);

  if (!selectedAnalysis || !selectedData) return <></>

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
        subtitle={selectedAnalysis.specimen?.specie?.name}
        title={getAnalysisTitle(selectedAnalysis, selectedData)}
        titleSize="h5"
      >
      </Header>
      <AnalysisTabs />
    </>
  );
};

export default style(AnalysisPage);
