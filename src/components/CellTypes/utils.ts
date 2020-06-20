import { CellClass, CellGroup, CellType } from "../../utils/api/types";
import { CellTypeTreeNode } from "../../utils/types";
import { sortElements } from "../../utils";

export const getCellTypeTreeNode = (
  cellType: CellGroup | CellClass | CellType,
  webId: string,
  children: CellTypeTreeNode[],
  parentId?: string
): CellTypeTreeNode => {
  return {
    originalId: cellType.id,
    id: webId,
    name: cellType.name,
    parent: parentId ? { id: parentId } : undefined,
    description: cellType.description,
    children: children,
    expanded: false,
    matching: false,
  };
};

export const getCellTypesAndTreeNodes = (
  cellGroups: CellGroup[]
): { treeNodes: CellTypeTreeNode[]; cellTypes: CellType[] } => {
  let treeId = 1;
  const cellTypes: CellType[] = [];

  const flattenedTypes: CellTypeTreeNode[] = cellGroups.map((cellGroup) => {
    const groupId = treeId.toString();
    treeId += 1;
    const groupChildren: CellTypeTreeNode[] = cellGroup.cellClassesInGroup.map(
      (cellClass) => {
        const classId = treeId.toString();
        treeId += 1;
        const classChildren: CellTypeTreeNode[] = cellClass.cellTypesInClass.map(
          (cellType) => {
            cellTypes.push(cellType);
            const typeId = treeId.toString();
            treeId += 1;
            return getCellTypeTreeNode(cellType, typeId, [], classId);
          }
        );

        return getCellTypeTreeNode(
          cellClass,
          classId,
          sortElements(classChildren, "asc", "name"),
          groupId
        );
      }
    );
    const node = getCellTypeTreeNode(cellGroup, groupId, groupChildren);
    node.expanded = true;
    return node;
  });

  return { treeNodes: flattenedTypes, cellTypes };
};

export const filterCellTypes = (
  cellTypes: CellTypeTreeNode[],
  searchValue: string
): CellTypeTreeNode[] => {
  if (!searchValue || searchValue === "") {
    return cellTypes;
  }
  const filtered: Set<CellTypeTreeNode> = new Set();
  cellTypes.map((cellType) => {
    const copied: CellTypeTreeNode = JSON.parse(JSON.stringify(cellType));

    if (copied.children) {
      copied.children = filterCellTypes(copied.children, searchValue);

      if (copied.children.length > 0) {
        copied.expanded = true;
        filtered.add(copied);
      }
    }

    if (copied.name.toLowerCase().indexOf(searchValue.toLowerCase()) >= 0) {
      copied.matching = true;
      copied.expanded = true;
      copied.children = cellType.children;
      filtered.add(copied);
    }
  });
  return [...filtered];
};
