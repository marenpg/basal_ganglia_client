import React, { useEffect, useState, useContext } from "react";
import { Box } from "@material-ui/core";

import TreeView from "../Base/TreeView";
import { CellTypesTreeProps } from "./types";
import CloseableDrawer from "../Base/CloseableDrawer";
import { CellTypeTreeNode } from "../../utils/types";
import { CellType } from "../../utils/api/types";
import { CellTypeComponent } from "../CellTypeComponents";
import { CellTypesDataContext } from "../../providers/contexts";
import { getExpandedNodeIds } from "../../utils/treeMapper";

export const CellTypesTree: React.FC<CellTypesTreeProps> = ({ cellTypeTree }) => {
  const [treeNodes, setTreeNodes] = useState<CellTypeTreeNode[]>([]);
  const [expandedNodeIds, setNodeIds] = useState<string[]>([]);
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [selectedCellType, setSelectedCellType] = useState<CellType | CellTypeTreeNode>();

  const { CellType: cellTypes } = useContext(CellTypesDataContext);

  useEffect(() => {
    setTreeNodes(cellTypeTree);
    setNodeIds(getExpandedNodeIds(cellTypeTree));
  }, [cellTypeTree]);

  const handleTreeClick = (cellType: CellTypeTreeNode) => (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    setDrawerOpen(true);

    if (cellType.children.length > 0) {
      setSelectedCellType(cellType);
      return;
    }
    if (cellTypes) {
      setSelectedCellType(cellTypes.filter((c: CellType) => c.id === cellType.originalId)[0]);
    }
  };

  return (
    <Box pt={1}>
      {treeNodes && expandedNodeIds.length > 0 &&
        <>
          <TreeView
            nodes={treeNodes}
            expandedIds={expandedNodeIds}
            handleTreeClick={handleTreeClick}
          />
          {selectedCellType &&
            <CloseableDrawer
              open={drawerOpen}
              handleDrawerChange={(newOpen) => setDrawerOpen(newOpen)}
              fullscreenLink={"observedInRegions" in selectedCellType ? `/cell-types/${selectedCellType.id}` : undefined}
            >
              <CellTypeComponent cellType={selectedCellType} drawer={true} handleTreeClick={handleTreeClick} />
            </CloseableDrawer>
          }
        </>
      }
    </Box >
  );
};
