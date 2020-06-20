import { BrainRegion, CellType, CellDescription } from "../../utils/api/types";
import { StyleProps } from "./CellType.jss";
import { CellTypeTreeNode } from "../../utils/types";

export interface CellTypePageProps extends StyleProps {
  id: string;
  cellGroups: BrainRegion[];
  drawer?: boolean;
}

export interface CellsInRegionCountProps extends StyleProps {
  region: BrainRegion;
  cellsIncludingSubRegions: CellType[];
}

export interface CellDescriptionProps {
  description: CellDescription;
}

export interface CellTypeProps extends StyleProps {
  cellType: CellType | CellTypeTreeNode;
  drawer: boolean;
  handleTreeClick: (node: CellTypeTreeNode) => void;
}

export interface CellTypeBrainRegionTreeProps {
  brainRegions: BrainRegion[];
}
