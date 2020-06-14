import React, { useContext, useState, useEffect } from "react";

import TreeView from "../Base/TreeView";
import { BrainRegionDataContext } from "../../providers/contexts";
import { BrainRegionCellTreeProps } from "./types";
import { Box } from "@material-ui/core";
import { CellTypeTreeNode } from "../../utils/types";
import { getCellTypeIds, getCellTypesFromIds, generatecCellTree } from "./utils";
import { getExpandedNodeIds } from "../../utils/treeMapper";

export const BrainRegionCellTree: React.FC<BrainRegionCellTreeProps> = ({ cellTypes }) => {
  const [treeNodes, setTreeNodes] = useState<CellTypeTreeNode[]>([]);
  const [expandedIds, setExpandedIds] = useState<string[]>([]);
  const { cellTypes: allCellTypes, cellClasses, cellGroups } = useContext(BrainRegionDataContext);

  useEffect(() => {
    const ids = getCellTypeIds(cellTypes);
    const cellTypesWithInfo = getCellTypesFromIds(ids, allCellTypes!);
    const cellTypeTree = generatecCellTree(cellTypesWithInfo, cellClasses!, cellGroups!);

    setTreeNodes(cellTypeTree);
    setExpandedIds(getExpandedNodeIds(cellTypeTree));
  }, [cellTypes]);

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
