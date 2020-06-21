import { Specie, CellDescription } from "./api/types";

export interface CheckBoxElement {
  id: string | number;
  name: string;
  selected: boolean;
}

export type SpecieCheckbox = Specie & { selected: boolean };

export interface SpeciesMap {
  [id: string]: SpecieCheckbox;
}

export interface GenericTreeNode {
  id: string;
  name: string;
  children: GenericTreeNode[];
  expanded?: boolean;
  matching?: boolean;
  parent?: { id: string };
  description?: CellDescription;
}

export interface CellTypeTreeNode extends GenericTreeNode {
  originalId: string;
  children: CellTypeTreeNode[];
  link?: string;
}

export interface BrainRegionTreeNode extends GenericTreeNode {}
