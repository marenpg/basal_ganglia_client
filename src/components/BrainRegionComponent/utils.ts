import {
  BrainRegion,
  CellType,
  CellClass,
  CellGroup,
  Analysis,
} from "../../utils/api/types";
import { CellTypeTreeNode } from "../../utils/types";
import { getCellTypeTreeNode } from "../CellTypes/utils";

export const getCellsInRegions = (regions: BrainRegion[]): CellType[] => {
  let cellTypes: CellType[] = []
  regions.map(region => {
    const cells: CellType[] = region.cellsObserved.map(c => ({...c, observedInRegions: [region]}))
    cells.map(c => {
      const cell = cellTypes.find(c1 => c1.id === c.id);
      if(cell){
        cell.observedInRegions = cell.observedInRegions.concat(c.observedInRegions);
      } else {
        cellTypes.push(c);
      }
    })
  })
  
  return cellTypes;
};

const getSubregionsHelper = (
  region: BrainRegion,
  subRegions: BrainRegion[],
  map: { [key: string]: BrainRegion }
): BrainRegion[] => {
  region.subRegions.map((r) => {
    const child = map[r.id];
    if (child.subRegions) {
      getSubregionsHelper(child, subRegions, map);
    }
    subRegions.push(child);
  });
  return subRegions;
};

export const getAllSubRegions = (
  region: BrainRegion,
  allRegions: BrainRegion[]
): BrainRegion[] => {
  const subRegions: BrainRegion[] = [];
  const map: { [key: string]: BrainRegion } = {};
  allRegions.map((region) => {
    map[region.id] = region;
  });
  return getSubregionsHelper(region, subRegions, map);
};

export const sortElements = <T>(
  elements: any,
  order: string,
  orderBy: string
): T => {
  if (order === "asc") {
    return elements.sort((a: any, b: any) =>
      a[orderBy] > b[orderBy] ? 1 : a[orderBy] < b[orderBy] ? -1 : 0
    );
  }

  return elements.sort((a: any, b: any) =>
    a[orderBy] < b[orderBy] ? 1 : a[orderBy] > b[orderBy] ? -1 : 0
  );
};

export const getAnalysisIdsInRegions = (regions: BrainRegion[]): string[] => {
  let analyses: Set<Analysis> = new Set();

  regions.map((region) => {
    if (region.analyses) {
      analyses = new Set([...analyses].concat(region.analyses));
    }
  });

  return [...analyses].map((a) => a.id);
};

const getCellNodeMap = (
  cellTypes: CellType[],
  cellClasses: CellClass[],
  cellGroups: CellGroup[],
  region: BrainRegion
): { [key: string]: CellTypeTreeNode } => {
  const treeNodeMap: { [key: string]: CellTypeTreeNode } = {};

  // First map the nodes of the array to an object -> create a hash table.
  sortElements<CellType[]>(cellTypes, "asc", "name").map((cellType) => {
    treeNodeMap[cellType.id] = getCellTypeTreeNode(
      cellType,
      cellType.id,
      [],
      cellType.classMembership.id + "class"
    );
    treeNodeMap[cellType.id].link = `/analyses/specie=${region.specie?.id}&brainRegion=${cellType.observedInRegions.map(b => b.id).join(",")}&cellType=${cellType.id}`;
  });

  cellClasses.map((cellClass) => {
    const webId = cellClass.id + "class";
    treeNodeMap[webId] = getCellTypeTreeNode(
      cellClass,
      webId.toString(),
      [],
      cellClass.groupMembership.id + "group"
    );
    treeNodeMap[webId].expanded = true;
  });

  cellGroups.map((cellGroup) => {
    const webId = cellGroup.id + "group";
    treeNodeMap[webId] = getCellTypeTreeNode(cellGroup, webId.toString(), []);
    treeNodeMap[webId].expanded = true;
  });
  
  return treeNodeMap;
};

export const generatecCellTree = (
  cellTypes: CellType[],
  cellClasses: CellClass[],
  cellGroups: CellGroup[],
  region: BrainRegion
): CellTypeTreeNode[] => {
  const unflatten = (
    cellTypes: CellType[],
    cellClasses: CellClass[],
    cellGroups: CellGroup[]
  ) => {
    const tree: CellTypeTreeNode[] = [];
    const treeNodeMap = getCellNodeMap(cellTypes, cellClasses, cellGroups, region);

    Object.entries(treeNodeMap).map(([id, treeNode]) => {
      // If the element is not at the root level, add it to its parent array of children.
      if (treeNode.parent) {
        // Remove dead cell types. Only works because it ordered with leafs first
        if (id.indexOf("class") < 0 || treeNode.children.length > 0) {
          const parent = treeNodeMap[treeNode.parent.id];
          parent.children.push(treeNode);
        }
      }
      // If the element is at the root level, add it to first level elements array.
      else if (treeNode.children.length > 0) {
        tree.push(treeNode);
      }
    });

    tree.map( cGroup => {
      cGroup.children.map(cClass => {
        cClass.children = sortElements<CellTypeTreeNode[]>(cClass.children, "asc", "name");
      })
    });

    return tree;
  };

  const treeNodes: CellTypeTreeNode[] = unflatten(
    cellTypes,
    cellClasses,
    cellGroups
  );
  return treeNodes;
};

export const getCellTypesDetailed = (
  cellTypes: CellType[],
  allCellTypes: CellType[]
) => {
  const cells: CellType[] = [];
  allCellTypes.map(c => {
    const cellType = cellTypes.find(c1 => c1.id === c.id);
    if(cellType){
      cells.push({...c, observedInRegions: cellType.observedInRegions})
    }
  });
  return cells;
};
