import React, { useState, useEffect, useContext } from "react";

import { AppBar, Box, Container, Tabs, Tab } from "@material-ui/core";
import { CellTypeContext } from "../../providers/contexts";
import TabPanel from "../Base/TabPanel";
import AnalysesContainer from "../../containers/AnalysesContainer";
import { AnalysesTable } from "../Analyses";

import { CellTypeInformation } from ".";

const a11yTabProps = (index: number) => ({
  id: `simple-tab-${index}`,
  "aria-controls": `simple-tabpanel-${index}`
});

export const CellTypeTabs: React.FC = () => {
  const [tabValue, setTabValue] = useState<number>(1);
  const [analysisIds, setAnalysesIds] = useState<string[]>([]);

  const { selectedCellType } = useContext(CellTypeContext);


  useEffect(() => {
    selectedCellType && setAnalysesIds(selectedCellType.analyses.map(a => a.id));
  }, [selectedCellType])

  const handleTabChange = (_: any, newTabValue: number) => {
    setTabValue(newTabValue);
  };

  return (
    <Box mb={4}>
      <AnalysesContainer analysisIds={analysisIds}>
        <AppBar position="static" color="secondary">
          <Tabs
            centered
            value={tabValue}
            onChange={handleTabChange}
            aria-label="simple tabs example"
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab label="Analyses" {...a11yTabProps(0)} />
            <Tab label="Brain regions" {...a11yTabProps(1)} />
          </Tabs>
        </AppBar>
        <TabPanel value={tabValue} index={0}>
          <Container maxWidth="md">
            <AnalysesTable />
          </Container>
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <Container maxWidth="md">
            <CellTypeInformation />
          </Container>
        </TabPanel>
      </AnalysesContainer>
    </Box>
  );
};
