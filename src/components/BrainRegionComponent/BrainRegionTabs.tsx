import React, { useState, useEffect } from "react";

import { AppBar, Box, Container, Divider, Tabs, Tab } from "@material-ui/core";

import { CellType } from "../../utils/api/types";
import TabPanel from "../Base/TabPanel";
import { CellsInRegionCount } from "../CellTypeComponents";
import { BrainRegionCellTree } from "./BrainRegionCellTree";
import BrainRegionConnections from "./connectivity";
import { BrainRegionTabsProps } from "./types";
import { getCellsInAllRegions, getAnalysisIdsInRegions } from "./utils";
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
  const [connectivity, setConnectivity] = useState<RegionConnectivity[]>([])

  useEffect(() => {
    const subRegionCells = getCellsInAllRegions(subRegions);
    setCellsInSubRegions(subRegionCells);
    const unique = new Set([...subRegionCells, ...selectedRegion.cellsObserved])
    setCellsInAllRegions([...unique]);
    setAnalysisIds(getAnalysisIdsInRegions([selectedRegion].concat(subRegions)));

    setConnectivity(getRegionConnectivity(selectedRegion));
  }, [selectedRegion, subRegions])

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
            <Tab label="Cells" {...a11yTabProps(0)} />
            <Tab label="Analyses" {...a11yTabProps(1)} />
            {connectivity && connectivity.length > 0 &&
              <Tab label="Connected Regions" {...a11yTabProps(2)} />
            }
          </Tabs>
        </AppBar>
        <TabPanel value={tabValue} index={0}>
          <CellsInRegionCount
            region={selectedRegion}
            cellsIncludingSubRegions={cellsInSubRegions}
          />
          <Divider />
          <Container maxWidth="sm">
            <BrainRegionCellTree cellTypes={cellsAllRegions} />
          </Container>
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
    </Box>
  );
};
