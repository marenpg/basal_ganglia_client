import React, { useState, useEffect, useContext } from "react";
import { withRouter, RouteComponentProps } from "react-router";

import { AppBar, Box, Container, Tabs, Tab, Typography } from "@material-ui/core";
import { CellTypeContext } from "../../providers/contexts";
import TabPanel from "../Base/TabPanel";
import AnalysesContainer from "../../containers/AnalysesContainer";
import { AnalysesTable } from "../Analyses";

import { CellTypeInformation } from ".";

const a11yTabProps = (index: number) => ({
  id: `simple-tab-${index}`,
  "aria-controls": `simple-tabpanel-${index}`
});

const CellTypeTabsInner: React.FC<RouteComponentProps> = ({ history }) => {
  const [tabValue, setTabValue] = useState<number>(0);
  const [analysisIds, setAnalysesIds] = useState<string[]>([]);

  const { selectedCellType } = useContext(CellTypeContext);

  useEffect(() => {
    selectedCellType && setAnalysesIds(selectedCellType.analyses.map(a => a.id));
  }, [selectedCellType])

  useEffect(() => {
    if (!history.location.hash) {
      return
    }
    let newTab = 0
    try {
      newTab = parseInt(history.location.hash.replace("#", ""));
      if (newTab > 1 || newTab < 0) {
        return;
      }
    } catch (error) {
      return;
    }

    setTabValue(newTab)
  }, [history]);

  const handleTabChange = (_: any, newTabValue: number) => {
    window.location.hash = `#${newTabValue}`;
    setTabValue(newTabValue);
  };

  return (
    <Box mb={4}>
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
      {!analysisIds.length ? (
        <>

          <TabPanel value={tabValue} index={0}>
            <Container maxWidth="md">
              <Box fontStyle="italic" mt={2}>
                <Typography>There are no analyses recorded with {selectedCellType?.name ?? "cell type"}</Typography>
              </Box>
            </Container>
          </TabPanel>
          <TabPanel value={tabValue} index={1}>
            <Container maxWidth="md">
              <CellTypeInformation />
            </Container>
          </TabPanel>
        </>
      ) : (
          <AnalysesContainer analysisIds={analysisIds}>
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
        )
      }
    </Box>
  );
};

export const CellTypeTabs = withRouter(CellTypeTabsInner);