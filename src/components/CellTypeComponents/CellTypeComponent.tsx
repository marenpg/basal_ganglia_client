import React from "react";
import { Box, Container, Typography } from "@material-ui/core";

import TreeView from "../Base/TreeView";
import { Header } from "../Base/Headers";
import { getExpandedNodeIds, setAllNodesExpanded } from "../../utils/treeMapper";
import { CellTypeProps } from "./types";
import { CellDescription } from "./CellDescription";
import { CellTypeTabs } from ".";
import CellTypeContainer from "../../containers/CellTypeContainer";
import { SpecieDescription } from "./SpecieDescription";

export const CellTypeComponent: React.FC<CellTypeProps> = ({ classes, cellType, handleTreeClick, drawer = false }) => {
  return <Box>
    <Header
      headerContainerClass={drawer ? classes.drawerHeaderContainer : classes.headerContainer}
      pageHeaderClass={drawer ? classes.drawerPageHeader : classes.pageHeader}
      subtitle={""}
      title={cellType.name} >
      {cellType.description &&
        <Container maxWidth="sm">
          <CellDescription description={cellType.description} />
        </Container>
      }
      {"observedInRegions" in cellType &&
        <CellTypeContainer cellTypeId={cellType.id}>
          <SpecieDescription />
        </CellTypeContainer>
      }
    </Header>
    {"children" in cellType &&
      <Container maxWidth="sm">
        <Typography component="h2" variant="h6">
          {"Child cells"}
        </Typography>
        <TreeView
          nodes={setAllNodesExpanded([cellType])}
          expandedIds={getExpandedNodeIds([cellType])}
          handleTreeClick={handleTreeClick}
        />
      </Container>
    }
    {"observedInRegions" in cellType &&
      <CellTypeContainer cellTypeId={cellType.id}>

        <CellTypeTabs />
      </CellTypeContainer>
    }
  </Box>
}