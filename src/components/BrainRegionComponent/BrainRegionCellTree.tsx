import React, { useContext, useState, useEffect } from "react";

import TreeView from "../Base/TreeView";
import { BrainRegionDataContext } from "../../providers/contexts";
import { BrainRegionCellTreeProps } from "./types";
import { Box } from "@material-ui/core";
import { CellTypeTreeNode } from "../../utils/types";
import { getCellTypesDetailed, generatecCellTree } from "./utils";
import { getExpandedNodeIds } from "../../utils/treeMapper";

export const BrainRegionCellTree: React.FC<BrainRegionCellTreeProps> = ({ cellTypes }) => {
  const [treeNodes, setTreeNodes] = useState<CellTypeTreeNode[]>([]);
  const [expandedIds, setExpandedIds] = useState<string[]>([]);
  const { selectedRegion, cellTypes: allCellTypes, cellClasses, cellGroups } = useContext(BrainRegionDataContext);

  useEffect(() => {
    const cellTypesWithInfo = getCellTypesDetailed(cellTypes, allCellTypes!);
    const cellTypeTree = generatecCellTree(cellTypesWithInfo, cellClasses!, cellGroups!, selectedRegion!);

    setTreeNodes(cellTypeTree);
    setExpandedIds(getExpandedNodeIds(cellTypeTree));
  }, [allCellTypes, cellClasses, cellGroups, cellTypes]);

  return (
    <Box pt={1}>
      {treeNodes && expandedIds.length > 0 &&
        <TreeView
          nodes={treeNodes}
          expandedIds={expandedIds}
          handleTreeClick={() => { }}
        />
      }
    </Box >
  );
};
