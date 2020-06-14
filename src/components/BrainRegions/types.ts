import { BrainRegion } from "../../utils/api/types";
import { GenericTreeNode } from "../../utils/types";

export interface SpecieBrainRegionsProps {
  title: string;
  regions: BrainRegion[];
  filter: string;
  handleRegionSelected: (region: GenericTreeNode) => void;
}

export interface BrainRegionTreeProps {
  regions: BrainRegion[];
  handleRegionSelected: (region: GenericTreeNode) => void;
}

export interface SpecieRegions {
  specieId: string;
  specieName: string;
  selected: boolean;
  regions: BrainRegion[];
}
