import React, { useState, useEffect, useContext } from "react";

import { AppBar, Box, Container, Tabs, Tab } from "@material-ui/core";
import { AnalysisContext } from "../../providers/contexts";
import TabPanel from "../Base/TabPanel";
import { AnalysisInformation } from "./AnalysisInformation";
import { AnimalInformation } from "./AnimalInformation";
import { SourceInformation } from "./SourceInformation";
import { AnatomicalMetadata } from "./AnatomicalMetadata";
import { DistributionInformation, QuantitationInformation, MorphologyInformation } from "./DataInformation";
import { SimilarAnalyses } from "./SimilarAnalses";


const a11yTabProps = (index: number) => ({
  id: `simple-tab-${index}`,
  "aria-controls": `simple-tabpanel-${index}`
});

export const AnalysisTabs: React.FC = () => {
  const [tabValue, setTabValue] = useState<number>(0);

  const { selectedAnalysis } = useContext(AnalysisContext);
  const hasSimilarAnalyses = selectedAnalysis?.similarAnalyses?.from.length;

  useEffect(() => {
  }, [selectedAnalysis])

  const handleTabChange = (_: any, newTabValue: number) => {
    setTabValue(newTabValue);
  };

  return (
    <Box mb={4}>
      <AppBar position="static" color="secondary">
        <Tabs
          // centered
          value={tabValue}
          onChange={handleTabChange}
          aria-label="simple tabs example"
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="on"
        >
          <Tab label={selectedAnalysis?.dataType} {...a11yTabProps(0)} />
          <Tab label="Animals" {...a11yTabProps(1)} />
          <Tab label="Data acquisition" {...a11yTabProps(2)} />
          <Tab label="Anatomical metadata" {...a11yTabProps(3)} />
          <Tab label="Source" {...a11yTabProps(4)} />
          {hasSimilarAnalyses &&
            <Tab label="Similar analyses" {...a11yTabProps(5)} />
          }
        </Tabs>
      </AppBar>
      <TabPanel value={tabValue} index={0}>
        <Container maxWidth="md">
          {selectedAnalysis?.dataType === "Quantitation" &&
            <QuantitationInformation />
          }
          {selectedAnalysis?.dataType === "Distribution" &&
            <DistributionInformation />
          }
          {selectedAnalysis?.dataType === "Morphology" &&
            <MorphologyInformation />
          }
        </Container>
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        <AnimalInformation />
      </TabPanel>
      <TabPanel value={tabValue} index={2}>
        <Container maxWidth="md">
          <AnalysisInformation />
        </Container>
      </TabPanel>
      <TabPanel value={tabValue} index={3}>
        <Container maxWidth="md">
          <AnatomicalMetadata />
        </Container>
      </TabPanel>
      <TabPanel value={tabValue} index={4}>
        <Container maxWidth="md">
          <SourceInformation />
        </Container>
      </TabPanel>
      {hasSimilarAnalyses &&
        <TabPanel value={tabValue} index={5}>
          <Container maxWidth="md">
            <SimilarAnalyses />
          </Container>
        </TabPanel>
      }
    </Box>
  );
};
