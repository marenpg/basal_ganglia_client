import { BrainRegion, CellType } from "../../utils/api/types";
import { StyleProps } from "./BrainRegion.jss";

export interface BrainRegionProps extends StyleProps {
  id: string;
  regions: BrainRegion[];
  drawer?: boolean;
}

export interface BrainRegionContentProps extends StyleProps {
  id: string;
  regions: BrainRegion[];
}

export interface BrainRegionTabsProps extends StyleProps {
  selectedRegion: BrainRegion;
  subRegions: BrainRegion[];
  selectedTab?: number;
}

export interface BrainRegionCellTreeProps {
  cellTypes: CellType[];
}