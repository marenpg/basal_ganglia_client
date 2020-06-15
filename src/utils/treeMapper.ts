import { GenericTreeNode } from "./types";

export const getParentsOfElement = (
  leafElement: any,
  allElements: any[],
  parentKey: string
): any[] => {
  let child = leafElement;
  const parents = [];
  while (child) {
    parents.push(child);

    const parent = allElements.filter((r) => r.id === child[parentKey]!.id)[0];
    child = parent;
    if (!parent[parentKey]) {
      parents.push(child);
      child = undefined;
    }
  }
  return parents;
};

export const getParentsOfElements = (
  leafElements: any[],
  allElements: any[],
  parentKey: string
): any[] => {
  let matchingRegions: Set<any> = new Set();
  leafElements.map((leafNode) => {
    const parentRegions = leafNode[parentKey]
      ? getParentsOfElement(leafNode, allElements, parentKey)
      : [leafNode];
    matchingRegions = new Set([...matchingRegions, ...parentRegions]);
    return;
  });

  return [...matchingRegions];
};

const getExpandedNodeIdsHelper = (
  nodes: GenericTreeNode[],
  ids: string[]
): string[] => {
  let newIds: string[] = [];
  nodes.map((node) => {
    if (node.expanded) {
      newIds.push(node.id);
    }
    if (node.children.length > 0) {
      newIds = newIds.concat(getExpandedNodeIdsHelper(node.children, newIds));
    }
  });
  return newIds.concat(ids);
};

export const getExpandedNodeIds = (nodes: GenericTreeNode[]): string[] => {
  const uniqueIds: Set<string> = new Set(getExpandedNodeIdsHelper(nodes, []));
  return [...uniqueIds];
};

export const setAllNodesExpanded = (
  nodes: GenericTreeNode[]
): GenericTreeNode[] => {
  nodes.map((rootNode) => {
    rootNode.expanded = true;
    if (rootNode.children.length > 0) {
      setAllNodesExpanded(rootNode.children);
    }
  });
  return nodes;
};
