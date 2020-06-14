import React, { useEffect, useState } from "react";
import { Box } from "@material-ui/core";

import TreeView from "../Base/TreeView";
import { BrainRegionTreeProps } from "./types";
import { generateTree } from "./utils";
import { GenericTreeNode } from "../../utils/types";

export const BrainRegionTree: React.FC<BrainRegionTreeProps> = ({ regions, handleRegionSelected }) => {
  const [treeNodes, setTreeNodes] = useState<GenericTreeNode[]>([]);
  const [nodeIds, setNodeIds] = useState<string[]>([]);

  useEffect(() => {
    setTreeNodes(generateTree(regions));
    setNodeIds(regions.map((r) => r.id));
  }, [regions]);

  const handleTreeClick = (region: GenericTreeNode) => (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    handleRegionSelected(region);
  };

  return (
    <Box pt={1}>
      {treeNodes && nodeIds.length > 0 &&
        <TreeView
          nodes={treeNodes}
          expandedIds={nodeIds}
          handleTreeClick={handleTreeClick}
        />
      }
    </Box >
  );
};
