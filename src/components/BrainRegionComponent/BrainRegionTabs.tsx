import React, { useState, useEffect } from "react";

import { AppBar, Box, Container, Divider, Tabs, Tab, CircularProgress, Typography } from "@material-ui/core";

import { CellType } from "../../utils/api/types";
import TabPanel from "../Base/TabPanel";
import { CellsInRegionCount } from "../CellTypeComponents";
import { BrainRegionCellTree } from "./BrainRegionCellTree";
import BrainRegionConnections from "./connectivity";
import { BrainRegionTabsProps } from "./types";
import { getCellsInRegions, getAnalysisIdsInRegions } from "./utils";
import { RegionConnectivity } from "./connectivity/types";
import { getRegionConnectivity } from "./connectivity/utils";
import AnalysesContainer from "../../containers/AnalysesContainer";
import { AnalysesTable } from "../Analyses/AnalysesTable";


const a11yTabProps = (index: number) => ({
  id: `simple-tab-${index}`,
  "aria-controls": `simple-tabpanel-${index}`
});

export const BrainRegionTabs: React.FC<BrainRegionTabsProps> = ({
  selectedRegion,
  subRegions,
}) => {
  const [tabValue, setTabValue] = useState<number>(0);
  const [cellsInSubRegions, setCellsInSubRegions] = useState<CellType[]>([])
  const [cellsAllRegions, setCellsInAllRegions] = useState<CellType[]>([])
  const [analysisIds, setAnalysisIds] = useState<string[]>([])
  const [regionIds, setRegionIds] = useState<string[]>([])
  const [connectivity, setConnectivity] = useState<RegionConnectivity[]>([])
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const subRegionCells = getCellsInRegions(subRegions);
    setCellsInSubRegions(subRegionCells);
    setCellsInAllRegions(getCellsInRegions(subRegions.concat(selectedRegion)));
    setAnalysisIds(getAnalysisIdsInRegions([selectedRegion].concat(subRegions)));

    setRegionIds([selectedRegion].concat(subRegions).map(r => r.id));
    setConnectivity(getRegionConnectivity(selectedRegion));
    setLoading(false);
  }, [selectedRegion, subRegions])

  const handleTabChange = (_: any, newTabValue: number) => {
    setTabValue(newTabValue);
  };

  return (
    <Box mb={4}>
      {loading ? (
        <CircularProgress />
      ) : (
          <AnalysesContainer analysisIds={analysisIds} regionIds={regionIds}>
            <AppBar position="static" color="secondary">
              <Tabs
                centered
                value={tabValue}
                onChange={handleTabChange}
                aria-label="simple tabs example"
                indicatorColor="primary"
                textColor="primary"
              >
                <Tab label="Cells" {...a11yTabProps(0)} />
                <Tab label="Analyses" {...a11yTabProps(1)} />
                {connectivity && connectivity.length > 0 &&
                  <Tab label="Connected Regions" {...a11yTabProps(2)} />
                }
              </Tabs>
            </AppBar>
            <TabPanel value={tabValue} index={0}>
              {!selectedRegion?.cellsObserved?.length && !subRegions?.length ? (
                <Box mt={4}>
                  <Container maxWidth="lg">
                    <Typography align="center">No cells observed in this region.</Typography>
                  </Container>
                </Box>
              ) : (
                  <>
                    <CellsInRegionCount
                      region={selectedRegion}
                      cellsIncludingSubRegions={cellsInSubRegions}
                    />
                    <Divider />
                    <Container maxWidth="sm">
                      <BrainRegionCellTree cellTypes={cellsAllRegions} />
                    </Container>
                  </>

                )}
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
              <AnalysesTable />
            </TabPanel>
            {connectivity && connectivity.length > 0 &&
              <TabPanel value={tabValue} index={2}>
                <BrainRegionConnections connectivity={connectivity} />
              </TabPanel>
            }
          </AnalysesContainer>
        )}
    </Box>
  );
};
