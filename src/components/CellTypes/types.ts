import { StyleProps } from "./CellTypes.jss";
import { CellGroup, Specie, CellClass, CellType } from "../../utils/api/types";
import { CellTypeTreeNode } from "../../utils/types";

export type CellGroupTree = CellGroup & { children: CellClassTree[] };
export type CellClassTree = CellClass & {
  parent: { id: string };
  children: CellTypeTree[];
};
export type CellTypeTree = CellType & { parent: { id: string } };

export interface CellTypesProps extends StyleProps {
  cellGroups: CellGroup[];
  species: Specie[];
}

export interface CellTypesTreeWrapperProps extends StyleProps {
  nameFilter: string;
  treeNodes: CellTypeTreeNode[];
}

export interface CellTypesTreeProps extends StyleProps {
  cellTypeTree: CellTypeTreeNode[];
}
