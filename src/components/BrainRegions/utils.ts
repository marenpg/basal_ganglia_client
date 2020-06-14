import { BrainRegion, Specie } from "../../utils/api/types";
import { SpecieRegions } from "./types";
import { GenericTreeNode } from "../../utils/types";

const getGenericTreeNode = (region: BrainRegion): GenericTreeNode => {
  return {
    id: region.id,
    name: region.name,
    children: region.subRegions
      ? region.subRegions.map((sub) => getGenericTreeNode(sub))
      : [],
    expanded: true,
    matching: false,
    parent: region.partOf ? getGenericTreeNode(region.partOf) : undefined,
  };
};

const getGenericTreeNodeOfRegion = (region: BrainRegion): GenericTreeNode => {
  return {
    id: region.id,
    name: region.name,
    children: [],
    expanded: true,
    matching: false,
    parent: undefined,
  };
};

export const generateGenericTreeNodes = (
  regions: BrainRegion[]
): GenericTreeNode[] => {
  // const tree: GenericTreeNode[] = [];
  const rootNodes = regions.filter((r) => !r.partOf);
  return rootNodes.map((rootNode) => getGenericTreeNode(rootNode));
};

export const generateTree = (regions: BrainRegion[]): GenericTreeNode[] => {
  const unflatten = (arr: BrainRegion[]) => {
    const tree: GenericTreeNode[] = [];
    const mappedArr: { [key: string]: BrainRegion } = {};
    const treeNodeMap: { [key: string]: GenericTreeNode } = {};
    // First map the nodes of the array to an object -> create a hash table.
    arr.map((elem) => {
      mappedArr[elem.id] = elem;
      treeNodeMap[elem.id] = getGenericTreeNodeOfRegion(elem);
      return;
    });

    Object.entries(treeNodeMap).map(([id, treeNode]) => {
      // If the element is not at the root level, add it to its parent array of children.
      const parent = mappedArr[id].partOf;
      if (parent && treeNodeMap[parent.id]) {
        treeNodeMap[parent.id].children.push(treeNode);
      }
      // If the element is at the root level, add it to first level elements array.
      else {
        tree.push(treeNode);
      }
    });

    return tree;
  };

  const treeNodes: GenericTreeNode[] = unflatten(regions);
  return treeNodes;
};

export const generateSpecieBrainRegions = (
  regions: BrainRegion[],
  species: Specie[]
): SpecieRegions[] => {
  return species.map((specie) => ({
    specieId: specie.id,
    specieName: specie.name,
    selected: true,
    regions: regions.filter(
      (region) => !region.specie || region.specie.id === specie.id
    ),
  }));
};
