import React, { useContext, useState, useEffect } from "react";

import TreeView from "../Base/TreeView";
import { CellTypesDataContext } from "../../providers/contexts";
import { CellTypeBrainRegionTreeProps } from "./types";
import { Box } from "@material-ui/core";
import { GenericTreeNode } from "../../utils/types";
import { generateTree } from "../BrainRegions/utils";
import { getExpandedNodeIds } from "../../utils/treeMapper";
import { BrainRegion } from "../../utils/api/types";

export const CellTypeBrainRegionTree: React.FC<CellTypeBrainRegionTreeProps> = ({ brainRegions }) => {
  const [treeNodes, setTreeNodes] = useState<GenericTreeNode[]>([]);
  const [expandedIds, setExpandedIds] = useState<string[]>([]);
  const { BrainRegion: allBrainRegions } = useContext(CellTypesDataContext);

  useEffect(() => {
    if (allBrainRegions) {
      const brainRegionsWithInfo: BrainRegion[] = []
      allBrainRegions.map(br => {
        brainRegions.map(br2 => {
          if (br2.id === br.id) {
            br.name = br2.name;
            brainRegionsWithInfo.push(br);
          }
        })
      });

      const brainRegionTree = generateTree(brainRegionsWithInfo);
      setTreeNodes(brainRegionTree)
      setExpandedIds(getExpandedNodeIds(brainRegionTree));

    }
  }, [allBrainRegions, brainRegions]);

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
